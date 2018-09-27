import { Cart } from './Cart'
import { ServiceStore } from './ServiceStore'

const { Provider, connect, dispatch } = new ServiceStore({
    cart: new Cart
})

export { Provider, connect, dispatch }
