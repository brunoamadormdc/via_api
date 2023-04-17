
import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
    key: 'products_vialeoes',
})

const products = atom({
    key: 'products',
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export {products}