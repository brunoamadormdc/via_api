import { Text, Box } from '@chakra-ui/react'
import useProducts from '../../hooks/useProducts'

export default function Header() {

    useProducts()

    return (
        <header>
            <Box bg={'viaLeoes'} width={'100%'} p={3} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                <Text color={'#fff'} fontSize={'22px'} fontWeight={'bold'}>Via Leões</Text>
                <Text color={'#fff'} fontSize={'14px'} fontWeight={'normal'} >Painel de Pedidos</Text>
            </Box>
        </header>
    )
}