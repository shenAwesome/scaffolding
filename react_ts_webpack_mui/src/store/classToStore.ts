import produce from "immer"
import { createStore, combineReducers } from 'redux'
import * as _ from 'lodash'

/**
 * decorator to tag a method as effect 
 */
const effect = (target: any, key: string) => {
    target[key].isEffect = true
}
/**
 * decorator to tag a method as selector 
 */
const selector = (target: any, key: string) => {
    target[key].isSelector = true
}

/**
 * convert class to redux state & action
 * @param cls 
 * @param modelName 
 */
class ServiceStore<T> {
    store: any
    dispatcher = {}
    selector = {}

    constructor(private services: T) {
        this.initStore()
    }

    initStore() {
        const reducers = {}
        _.forEach(this.services as any, (service, serviceName) => {
            //states
            const serviceState = {}
            _.forEach(service, (val, key) => {
                serviceState[key] = val
            })
            //dispatch wrapper, so we can dispatch with method calling
            const dispatch = {}
            this.dispatcher[serviceName] = dispatch
            //selectors
            const selector = {}
            this.selector[serviceName] = selector
            //reducers 
            const serviceReducers = []
            _.forEach(Object.getPrototypeOf(service), (method, methodName) => {
                if (method.isSelector) {
                    selector[methodName] = function () {
                        return method.call(store.getState()[serviceName])
                    }
                } else {
                    const actionType = `${serviceName}/${methodName}`
                    const reducer = (state, action) => {
                        let ret = state
                        if (action.type == actionType) {
                            if (method.isEffect) {//pass dispatch as this, state as second arguments just in case
                                ret = produce(state, draftState => {
                                    method.call(dispatch, action.payload, draftState)
                                })
                            } else {//pass state as this
                                //use the mighty immer
                                ret = produce(state, draftState => {
                                    method.call(draftState, action.payload)
                                })
                            }
                        }
                        return ret
                    }
                    dispatch[methodName] = function (payload) {
                        console.log('gogo=' + actionType)
                        store.dispatch({
                            type: actionType,
                            payload: payload
                        })
                    }
                    serviceReducers.push(reducer)
                }
            })

            reducers[serviceName] = function (state, action) {
                if (state == undefined) state = serviceState
                return serviceReducers.reduce((s, reducer) => reducer(s, action), state)
            }
        })

        const { __REDUX_DEVTOOLS_EXTENSION__ } = window as any
        let devExt = __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()
        const store = createStore(combineReducers(reducers), devExt)
        this.store = store
        console.log(this.store)
    }

    get dispatch(): T {
        return this.dispatcher as any
    }

    get state(): T {
        return this.store.getState()
    }
}

/*
class Test {
    score = 1

    increase(scroe) {
        this.score = this.score + scroe
    }

    @effect
    async delayIncrease(score, state?) {
        await new Promise(resolve => setTimeout(resolve, 1 * 1000))
        this.increase(score)
    }
}

let service = new ServiceStore({
    test: new Test()
})

service.dispatch.test.increase(3)
service.dispatch.test.delayIncrease(6) 
console.log(service.state.test.score)
*/

export { ServiceStore, effect, selector }