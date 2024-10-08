import { ProductsFactory } from '@/factories/products-factory';
import axios from 'axios'

const authToken = 'a5c9091a7db567f6dd83c1d60f55d9e239f5d698'

const HTTP = axios.create({
    baseURL: 'https://vialeoes.com.br/wp-json/wc/v3/',
    headers: {
        
        'Authorization': `Basic ${btoa(`${'ck_6c4cc53e7e857e050c1af2f66984b5c0af636e78'}:${'cs_9962cf5d94a24b948b679b3194fd6345e60e4e6a'}`)}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

const products = new ProductsFactory()

export default async function handler(req, res) {

    if(req.method === 'POST') {

        if(req.headers.authorization != authToken) {
            res.status(401).json({message: 'Invalid Token'})
        }

        try {
            await HTTP.get(`products?per_page=100&_fields=id,name`)
            .then(response => {
                res.status(200).json(response.data);
            })
        }
        catch(e) {
            res.status(400).json(e)
        }
       
    }
  
}