import { products } from "@/store/products"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import useApi from "./services/useApi"


export default function useProducts() {
    
    const api = useApi()
    const [prod, setProd] = useRecoilState(products)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        try{
            const response = await api.postServiceAuth('products')
            setProd(response.data)
        }
        catch(error){
            console.log(error)
        }
    }

    return {
        prod
    }
}