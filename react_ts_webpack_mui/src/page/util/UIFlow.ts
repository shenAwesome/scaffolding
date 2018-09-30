
function arrayAdd<T>(array: T[], item: T) {
    if (array.indexOf(item) == -1) {
        array.push(item)
    }
}
function arrayRemove<T>(array: T[], item: T) {
    const idx = array.indexOf(item)
    array.splice(idx, 1)
}


type SimpleAction<T=any> = (payload: T) => any

abstract class Action<T=any> {
    context: Object
    flow: Flow

    abstract execute(payload: T): Promise<any>

    /** event for cleaning up  */
    onExecuted() { }

    /** when the flow finishes  */
    onFlowFinish() { }
    /** called by Flow when Flow.cancel is called, tells action to cancel*/
    cancel() { }
    /**
     * use to put in actions, convert Action to a simple action, to be used like function
     */
    get fn() {
        return <any>this as SimpleAction<T>
    }
}



type Actions = { [id: string]: SimpleAction }

/**
 * A Task contains 1-n actions, it can be stopped
 * Actions should have access to task context and can modify it and return values
 * Sctions are functions and can only have one parameter
 * 
 */
class Flow<T extends Actions = any> extends Action {
    isCancelled = false
    executed: Action[] = []
    executing: Action[] = []

    get actionList() {
        const list = []
        Object.keys(this.actions).forEach(k => {
            const action = this.actions[k]
            if (action instanceof Action) {
                list.push(action)
            }
        })
        return list as Action[]
    }

    constructor(public context: Object, public actions: T, private main: (actions: T) => Promise<any>) {
        super()
        this.actionList.forEach(act => {
            act.context = context
            act.flow = this
        })
    }

    async execute() {
        return this.startFlow()
    }

    startFlow() {
        const { context, main } = this,
            flowActions = this.createFlowActions(),
            p = main.call(context, flowActions) as Promise<any>

        const cleanup = () => {
            this.executed.forEach(a => {
                a.onFlowFinish()
            })
        }

        return p.then(ret => {
            cleanup()
            return ret
        }).catch(reason => {
            cleanup()
            throw reason
        })
    }

    createFlowActions() {
        const { actions, executed, executing, context } = this,
            flowActions = {}
        Object.keys(actions).forEach(actionId => {
            flowActions[actionId] = (payload: any) => {
                if (this.isCancelled) {
                    throw 'TaskCancelled'
                }
                let ret: Promise<any> = null
                const action = actions[actionId]
                if (action instanceof Action) {
                    //keep executed actions so they can 'clean up'
                    arrayAdd(executed, action)
                    arrayAdd(executing, action)
                    const onExecuted = () => {
                        action.onExecuted()
                        arrayRemove(executing, action)
                    }
                    ret = action.execute(payload).then(val => {
                        onExecuted()
                        return val
                    }).catch(reason => {
                        onExecuted()
                        throw reason
                    })
                } else {
                    ret = action.call(context, payload)
                }
                return ret
            }
        })
        return flowActions
    }

    cancel() {
        this.isCancelled = true
        this.executing.forEach(a => a.cancel())
    }
}



function getMethodNames(src) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(src))
        .filter(n => typeof src[n] == 'function')
        .filter(n => !(n == 'constructor' || n.startsWith('_')))
}



class Mark extends Action<string> {
    async execute(payload) {
        console.log('mark', payload)
        this['test'] = payload
    }
    onExecuted() {
        console.log('mark finished', this)
    }
    onFlowFinish() {
        console.log('the flow is done', this)
    }
}

const context = {
    map: 1
}

const util = {
    sleep(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time)
        });
    }
}

const actions1 = {
    action1: payload => {
        return 1
    },
    action2: payload => {
        return 2
    },
    mark: new Mark().fn
}

const actions2 = {
    look: payload => 3
}

const actions = { ...util, ...actions1, ...actions2 }

const flow = new Flow(context, actions, async function (actions) {
    console.time('start')
    let v0 = actions.mark('test')
    let v1 = actions.action1(1)
    console.log(v1)
    await actions.sleep(2000)
    let v2 = actions.action2(1)
    console.log(v2)
    await actions.sleep(2000)
    let v3 = actions.action2(1)
    console.log(flow.isCancelled)
    console.timeEnd('start')
    return 'task done'
})

flow.execute().then(ret => {
    console.log(ret)
})

setTimeout(() => {
    //flow.cancel()
}, 3000);


