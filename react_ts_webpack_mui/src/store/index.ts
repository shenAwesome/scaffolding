import { Cart } from './Cart'
import { ServiceStore } from './classToStore'

//-------------------an utility plugin 

const serviceStore = new ServiceStore({
    cart: new Cart
})

console.log(serviceStore.calc)

const { store, dispatch, connect } = serviceStore


export { serviceStore, store, dispatch, connect }
