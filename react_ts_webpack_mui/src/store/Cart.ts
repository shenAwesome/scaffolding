
interface Product {
    name: string
    price: number
    amount: number
}


class Cart {

    //---------------------- state -----------------------
    name = 'My nice cart'
    products = [] as Product[]

    //--------------------- pure functions (reducers)
    /**
     * add a product
     * @param prod 
     */
    add(prod: Product) {
        this.products.push(prod)
    }

    //--------------------- async functions (effects), can only call pure function, no access to state 
    /**
     * add a product in 1 sec
     * @param prod 
     */
    async addAsync(prod: Product) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.add(prod)
    }

    //--------------------- selectors -----------------------
    get_name() {
        return this.name
    }

    get_total() {
        return this.products.reduce((a, b) => a + (b.price * b.amount), 0)
    }
}

export { Cart }