import useApi from '@/hooks/services/useApi'

export default function useLogin() {
    const api = useApi()

    const makeLogin = async (password) => {
        try{
            const response = await api.postService('simpleauth',{password})
            return response
        }
        catch(error){
            return error
        }
    }

    return {
        makeLogin
    }

}