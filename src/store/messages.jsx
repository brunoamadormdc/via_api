
import { atom } from 'recoil'

const messages = atom({
    key: 'messages',
    default: {
        'notoken': {state: false, message: 'Faça login para acessar o sistema.'},
        'login': {state: false, message: 'Senha inválida.'},
        'invalid': {state: false, message: 'Senha inválida.'}
    }
})

export {messages}