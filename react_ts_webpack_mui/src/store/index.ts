import { init } from '@rematch/core'
import selectPlugin from '@rematch/select'
import loadingPlugin from '@rematch/loading'
import { toModels } from './classToModel'
import { Cart } from './Cart'
import { connect as _connect } from 'react-redux'
const connect: any = _connect //just to remove ts error

//-------------------an utility plugin
const UtilPluginName = 'util'
const plugin = {
    config: {
        models: {
            [UtilPluginName]: {
                name: UtilPluginName,
                reducers: {
                    changeLoading: (state, payload) => {
                        const loading = state.loading + payload.change
                        return { ...state, loading }
                    }
                },
                state: {
                    loading: 0
                }
            }
        },
    },
    onModel(model) {
        const { name } = model,
            { dispatch } = this,
            self = dispatch[UtilPluginName]
        if (name == UtilPluginName) return
        console.log(model)
        const actions = dispatch[name]
        console.log(actions)
        Object.keys(actions).forEach((actName: string) => {
            if (actions[actName].isEffect) {
                let effect = actions[actName]
                let wrapper = async (payload) => {
                    self.changeLoading({ change: 1 })
                    await effect(payload)
                    self.changeLoading({ change: -1 })
                }
                actions[actName] = wrapper
            }
        })
    }
}

const store = init({
    plugins: [
        selectPlugin(),
        plugin
    ],
    models: toModels({
        cart: Cart
    })
})

interface Dispatch {
    cart: Cart
}

const storeSelect = store.select,
    dispatch: Dispatch = store.dispatch as any

const select = selector => function (target) {
    return connect(storeSelect(selector))(target)
} as any


export { store, dispatch, select, connect }
