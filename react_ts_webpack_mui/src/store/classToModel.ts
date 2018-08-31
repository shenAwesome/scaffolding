import { createModel, ModelConfig } from '@rematch/core'
import produce from "immer"

function classToModel(cls: any, modelName: string) {
    let model = new cls,
        fields = Object.keys(model),
        fns = Object.keys(Object.getPrototypeOf(model))

    let fn_selector = [], fn_reducer = [], fn_effect = []

    fns.forEach(f => {
        let addTo = fn_reducer
        if (f.indexOf('get_') == 0) {
            addTo = fn_selector
        } else if (f.endsWith('Async')) {
            addTo = fn_effect
        }
        addTo.push(f)
    })
    //console.log(model)
    //state
    let state = {}, reducers = {}, selectors = {}
    fields.forEach(f => state[f] = model[f])
    //reducer
    fn_reducer.forEach(fn => {
        reducers[fn] = produce((_state, payload) => {
            (model[fn] as Function).call(_state, payload)
        })
    })
    //effects
    let effects = (dispatch) => {
        let fns = {}
        fn_effect.forEach(fn => {
            fns[fn] = function (payload, rootState?) {
                (model[fn] as Function).call(dispatch[modelName], payload)
            }
        })
        return fns
    }
    //selector
    fn_selector.forEach(fn => {
        selectors[fn.substring(4)] = function () {
            return (rootState, props) =>
                (model[fn] as Function).call(rootState[modelName], props)
        }
    })
    const cfg = { state, reducers, effects, selectors }
    console.log(cfg)
    return createModel(cfg) as any
}

function toModels(obj: any) {
    let models = {}
    Object.keys(obj).forEach(k => {
        models[k] = classToModel(obj[k], k)
    })
    return models as any
}

export { classToModel, toModels }