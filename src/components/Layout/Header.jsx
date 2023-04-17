import { Text, Box } from '@chakra-ui/react'
import useProducts from '../../hooks/useProducts'

export default function Header() {

    useProducts()

    return (
        <header>
            <Box bg={'viaLeoes'} width={'100%'} p={3} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} borderBottom={'1px solid #fff'}>
                <Text color={'#fff'} fontSize={'22px'} fontWeight={'bold'}>Gerenciamento Via Leões</Text>
                
            </Box>
        </header>
    )
}