import { useEffect, useState } from "react";
import useApi from "./services/useApi";
import { orders } from "@/store/orders";
import { useRecoilState, useRecoilValue } from "recoil";
import { orders_filter, orders_search } from "@/store/orders";
import {loader as loaderAtom} from '@/store/loader'

export default function useOrders() {
    const api = useApi()
    const [data, setData] = useState({ per_page: 100, page: 1, search: null, search_type: '[billing.first_name]' })
    const [itensPage, setItensPage] = useState({ totalPages: null, page: 1 })
    const [ord, setOrd] = useRecoilState(orders)
    const ord_filter = useRecoilValue(orders_filter)
    const [_orders_search, setOrders_search] = useRecoilState(orders_search)
    const [_loader, setLoader] = useRecoilState(loaderAtom)

    useEffect(() => {
        const item = localStorage.getItem('viaLeoesToken')
        if (!item) {
          window.location.href = '/login'
          
        }
        else {
          getOrders({per_page:100})
                             
        }
        
    },[])

    

    const getOrders = async (data) => {
        setLoader(true)
        try{
            let url = data?.search_type == '_billing_nome_aluno' ? 'ordersfiltered' : 'orders'
            const response = await api.postServiceAuth(url,data)
            setOrd(response.data)
            setItensPage({...itensPage, totalPages: response.data.totalPages})
            setOrders_search({ ..._orders_search, value: '', field:'Nome do cliente' })
            setLoader(false)
        }
        catch(error){
            setLoader(false)
            if(error.response.status === 400) {
                alert('Não encontrado...')
            }
            if(error.response.status === 401) {
                localStorage.removeItem('viaLeoesToken')
                window.location.href = '/login'
            }
        }
    }

    return {
        getOrders, ord_filter, _orders_search, setOrders_search, data, setData, itensPage, setItensPage
    }

}