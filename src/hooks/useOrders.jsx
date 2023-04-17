import { useEffect, useState } from "react";
import useApi from "./services/useApi";
import { orders } from "@/store/orders";
import { useRecoilState, useRecoilValue } from "recoil";
import { orders_filter, orders_search } from "@/store/orders";

export default function useOrders() {
    const api = useApi()
    const [data, setData] = useState({ per_page: 200, page: 1, search: null, search_type: '[billing.first_name]' })
    const [ord, setOrd] = useRecoilState(orders)
    const ord_filter = useRecoilValue(orders_filter)
    const [_orders_search, setOrders_search] = useRecoilState(orders_search)

    useEffect(() => {
        getOrders({per_page:150})
    },[])

    

    const getOrders = async (data) => {
        try{
            const response = await api.postService('orders',data)
            setOrd(response.data)
            setOrders_search({ ..._orders_search, value: '', field:'Nome do cliente' })
        }
        catch(error){
            console.log(error)
        }
    }

    return {
        getOrders, ord_filter, _orders_search, setOrders_search, data, setData
    }

}