import { Text, Box } from '@chakra-ui/react'
import useProducts from '../../hooks/useProducts'
import styles from './Header.module.scss'
import logout_image from '../../assets/images/logout.png'
import excel_image from '../../assets/images/excel.png'
import { Search2Icon } from '@chakra-ui/icons'

export default function Header({ exportToExcel, logout, handleSetbusca }) {
    useProducts()

    return (
        <header>
            <div className={`${styles['__buttons']}`}>
                <div onClick={() => handleSetbusca()} className={`${styles['__search']}`}>
                    <Search2Icon w={5} h={5} color="#fff" />
                </div>
                <div onClick={() => exportToExcel()} className={`${styles['__exportExcel']}`}>
                    <img src={excel_image.src} alt="Excel" />
                </div>
                <div onClick={() => logout()} className={`${styles['__logout']}`}>
                    <img src={logout_image.src} alt="logout" />
                </div>
            </div>
            <Box bg={'viaLeoes'} width={'100%'} p={3} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} borderBottom={'1px solid #fff'}>
                <Text color={'#fff'} fontSize={'22px'} fontWeight={'bold'}>Gerenciamento Via Leões</Text>

            </Box>
        </header>
    )
}