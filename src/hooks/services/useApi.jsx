import axios from 'axios'

export default function useApi() {

    const HTTP = axios.create({
        baseURL: '/api',
        headers: { 'Content-Type': 'application/json'}
    })

    const postService = async (url, data={}) => {
        return HTTP.post(url, data)
    }

    const getService = async (url, ...parameters) => {
        return HTTP.get(`${url}/${parameters.join('/')}`)
    }


    return {
        postService, getService
    }
}