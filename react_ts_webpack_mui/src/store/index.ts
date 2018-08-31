import { init } from '@rematch/core'
import selectPlugin from '@rematch/select'
import { toModels } from './classtoModel'
import { Cart } from './Cart'
import { connect } from 'react-redux'

const store = init({
    plugins: [selectPlugin()],
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

export { store, dispatch, select }
