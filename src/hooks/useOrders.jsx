import { useEffect } from "react";
import useApi from "./services/useApi";
import { orders } from "@/store/orders";
import { useRecoilState, useRecoilValue } from "recoil";
import { orders_filter, orders_search } from "@/store/orders";

export default function useOrders() {
    const api = useApi()
    const [ord, setOrd] = useRecoilState(orders)
    const ord_filter = useRecoilValue(orders_filter)
    const [_orders_search, setOrders_search] = useRecoilState(orders_search)

    useEffect(() => {
        getOrders({per_page:25})
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
        getOrders, ord_filter, _orders_search, setOrders_search
    }

}