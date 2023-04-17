import { ListFactory } from '@/factories/list-factory';
import axios from 'axios'

const HTTP = axios.create({
    baseURL: 'https://vialeoes.com.br/wp-json/wc/v3/',
    headers: {
        'Authorization': `Basic ${btoa(`${'ck_6c4cc53e7e857e050c1af2f66984b5c0af636e78'}:${'cs_9962cf5d94a24b948b679b3194fd6345e60e4e6a'}`)}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

const list = new ListFactory()

export default async function handler(req, res) {

    if(req.method === 'POST') {
        const body_params = req.body
        
        let string_params = ''

        for (const [key, value] of Object.entries(body_params)) {
            string_params += `&${key}=${value}`
        }

        try {
            await HTTP.get(`orders${string_params != '' ? '?' + string_params : ''}`)
            .then(response => {
                res.status(200).json(response.data);
            })
        }
        catch(e) {
            res.status(400).json(e)
        }
       
    }
  
}