
import { atom, selector } from 'recoil'

const orders = atom({
    key: 'orders',
    default: null
})

const orders_search = atom({
    key: 'orders_search',
    default: {
        field:'Nome do cliente',
        value:''
    }
})

const orders_filter = selector({
    key: 'orders_filter',
    get: ({ get }) => {
        
        const _orders = get(orders)
        const _orders_search = get(orders_search)

        let newOrders = new Object()
        newOrders = {..._orders}
        
        if (!_orders) {
            return null
        }

        if (_orders_search.value === '') {
            return newOrders
        }
        
        newOrders.list = _orders.list.filter((item) => {
            return item[_orders_search.field].toLowerCase().includes(_orders_search.value.toLowerCase())
        })

        return newOrders
    }
})

export {orders, orders_filter, orders_search}