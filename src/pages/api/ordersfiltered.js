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

        let aluno_nome = string_to_slug(body_params.search)
        console.log(aluno_nome)
        try {
            await HTTP.get(`orders?per_page=1000`)
            .then(response => {
                
                list.getHeaders(response.headers)
                list.filterListData(response.data)

                let filtered = list.list.filter((item) => {
                    let verify = string_to_slug(item['Nome do aluno']).match(aluno_nome)
                    if(verify != null) return item
                })

                let object_return = {
                    totalPages:1,
                    totalOrders:0,
                    totalAcc:0,
                    list:filtered
                }

                res.status(200).json(object_return);
                
            })
        }
        catch(e) {
            console.log(e)
            res.status(400).json('Ocorreu um erro')
        }
       
    }
  
}

let string_to_slug = (str) => {
    //write a function that convert a string to slug and return it
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    
    // remove accents, swap ñ for n, etc
    let from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    let to   = "aaaaaeeeeeiiiiooooouuuunc------";
    for (let i=0, l=from.length ; i<l ; i++)
    {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
    
    return str;
}