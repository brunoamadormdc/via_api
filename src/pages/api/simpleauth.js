const authToken = 'a5c9091a7db567f6dd83c1d60f55d9e239f5d698'
const validPassword = 'vialeoes788926@vialeoes.com.br'

export default async function handler(req, res) {

    if(req.method === 'POST') {
        let body = req.body

        if(body.password === validPassword) {
            res.status(200).json({token: authToken})
        }
        else {
            res.status(401).json({message: 'Invalid password'})
        }
    }
  
}

