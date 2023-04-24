import axios from 'axios'

export default function useApi() {

    const HTTP = axios.create({
        baseURL: '/api',
        headers: { 'Content-Type': 'application/json'}
    })

    const headersCommon = () => {
        return HTTP.defaults.headers.common['Authorization'] = `${Boolean(localStorage.getItem('viaLeoesToken')) ? localStorage.getItem('viaLeoesToken') : ''}`
    }

    const postService = async (url, data={}) => {
        return HTTP.post(url, data)
    }

    const postServiceAuth = async (url, data={}) => {
        headersCommon()
        return HTTP.post(url, data)
    }

    const getService = async (url, ...parameters) => {
        return HTTP.get(`${url}/${parameters.join('/')}`)
    }


    return {
        postService, postServiceAuth, getService
    }
}