import produce from "immer"
import { createStore, combineReducers } from 'redux'
import { connect as reduxConnect, Provider } from 'react-redux'
import * as _ from 'lodash'
import * as React from 'react'

/**
 * decorator to tag a method as effect 
 */
const effect = (target: any, key: string) => {
    target[key].isEffect = true
}
/**
 * decorator to tag a method as selector 
 */
const calc = (target: any, key: string) => {
    target[key].isCalc = true
}

/**
 * yarn add react-redux immer lodash redux
 * yarn add @types/react-redux @types/lodash @types/redux --dev
 * convert class to redux state & action
 * @param cls 
 * @param modelName 
 */
class ServiceStore<T> {
    /**
     * the redux store instance
     */
    public store: any
    private dispatcher = {}
    private calcFields = {}

    constructor(private services: T) {
        this.initStore()
    }

    private initStore() {
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
            const calcFields = {}
            this.calcFields[serviceName] = calcFields
            //reducers 
            const serviceReducers = []
            _.forEach(Object.getPrototypeOf(service), (method, methodName) => {
                if (method.isCalc) {
                    calcFields[methodName] = function () {
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

        const { __REDUX_DEVTOOLS_EXTENSION__ } = window as any,
            devExt = __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__(),
            store = createStore(combineReducers(reducers), devExt)
        this.store = store
    }

    /**
     * root dispatcher
     */
    get dispatch(): T {
        return this.dispatcher as any
    }

    /**
     * root state
     */
    get state(): T {
        return this.store.getState()
    }

    /**
     * root calc dictionary which contains all calculated fields
     */
    get calc(): T {
        return this.calcFields as any
    }

    /**
    * connect decorator to use with React.Component.
    * it maps state (or calcudated fields) to component props
    */
    get connect() {
        const { calc } = this
        const connect = function (stateMap: ((state: T) => object),
            calcMap?: (calc: T) => object) {
            return function (method) {
                return reduxConnect((state: any) => {
                    const map1 = stateMap(state),
                        map2 = calcMap ? calcMap(calc) : null
                    return { ...map1, ...map2 }
                })(method) as any
            }
        }
        return connect
    }

    /**
     * the service provider
     */
    get Provider() {
        const { store } = this
        return (props) => {
            return React.createElement(Provider, { store }, props.children)
        }
    }
}

export { ServiceStore, effect, calc }