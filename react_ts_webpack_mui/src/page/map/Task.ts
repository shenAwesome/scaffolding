

/**
 * A Task contains 1-n actions, it can be stopped
 * Actions should have access to task context and can modify it and return values
 * Sctions are functions and can only have one parameter
 * 
 */


interface Task {
    start(fn: () => Promise<any>)
    cancel()
}



function getMethodNames(src) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(src))
        .filter(n => typeof src[n] == 'function')
        .filter(n => !(n == 'constructor' || n.startsWith('_')))

}


type SimpleAction<T> = (payload: T) => any

abstract class ComplexAction<T> {
    abstract execute(payload: T)

    onTaskFinish() {

    }
    onTaskCancel() {

    }

    get fn() {
        return <any>this as SimpleAction<T>
    }
}


function createTask<T1, T2>(context: T1, actions: T2): Task & T1 & T2 {
    let cancelled = false

    const ctx = {
        start(fn: () => Promise<any>) {
            console.log('ctx', ctx)
            fn.call(ctx).then(() => {
                console.log('finish!')
                //to call all action onfinish
            }).catch(reason => {
                console.log(reason)
            })
        },
        /** cancel the Task */
        cancel() {
            cancelled = true
        }

    }
    const executedActions = []
    Object.assign(ctx, context)
    //copy actions
    Object.keys(actions).forEach(actionId => {
        ctx[actionId] = (payload: any) => {
            if (cancelled) {
                throw 'TaskCancelled'
            }
            let ret = null
            const action = actions[actionId]
            if (action instanceof ComplexAction) {
                if (executedActions.indexOf(actionId) == -1) { //keep executed actions so they can clearn resource later
                    executedActions.push(actionId)
                }
                ret = action.execute.call(ctx, payload)
            } else {
                ret = action.call(ctx, payload)
            }
            return ret
        }
    })

    return ctx as any
}

class Mark extends ComplexAction<string> {
    execute(payload) {
        console.log('mark', payload)
        this['test'] = payload
    }
}

const context = {
    map: 1
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

const actions = { ...actions1, ...actions2 }

const task = createTask(context, actions)

task.start(async () => {
    let v1 = task.action1(1)
    console.log(v1)
    let v2 = task.action2(1)
    console.log(v2)
    let v3 = task.mark('test')
    console.log(task)
})


