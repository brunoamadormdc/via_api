import { ListFactory } from '@/factories/list-factory';
import axios from 'axios'

const authToken = 'a5c9091a7db567f6dd83c1d60f55d9e239f5d698'

const HTTP = axios.create({
    baseURL: 'https://vialeoes.com.br/wp-json/wc/v3/',
    headers: {
        'Authorization': `Basic ${btoa(`${'ck_6c4cc53e7e857e050c1af2f66984b5c0af636e78'}:${'cs_9962cf5d94a24b948b679b3194fd6345e60e4e6a'}`)}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

const list = new ListFactory()

export default async function handler(req, res) {

    if(req.method === 'POST') {
        const body_params = req.body
        const head = req.headers

        if(head.authorization != authToken) {
            res.status(401).json({message: 'Invalid Token'})
        }

        let string_params = ''

        for (const [key, value] of Object.entries(body_params)) {
            if(value != null) string_params += `&${key}=${value}`
        }

        console.log(string_params)

        try {
            await HTTP.get(`orders${string_params != '' ? '?' + string_params : ''}`)
            .then(response => {
                
                list.getHeaders(response.headers)
                list.filterListData(response.data)
                res.status(200).json(list);
                
            })
        }
        catch(e) {
            res.status(400).json('Ocorreu um erro')
        }
       
    }
  
}