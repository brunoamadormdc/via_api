import { Box, FormControl, Text, Input, Image, Button } from "@chakra-ui/react";
import styles from './Login.module.scss'
import useLogin from "@/hooks/useLogin";
import { useCallback, useState, useEffect } from "react";
import Router, {useRouter} from 'next/router'

export default function Login() {

    useEffect(() => {
        if (localStorage.getItem('viaLeoesToken')) Router.push('/orders')
    })

    const [password, setPassword] = useState('')
    const routing = useRouter()

    const {makeLogin} = useLogin()

    const handleLogin = useCallback (async() => {
        if(password.trim() === '') return alert('Digite a senha!')
        try {
            const response = await makeLogin(password)
            localStorage.setItem('viaLeoesToken', response.data.token)
            routing.push('/orders')
        }
        catch(error){
            localStorage.removeItem('viaLeoesToken')
            alert('Senha incorreta!')
        }
    }, [password])

    const handlePasswordchange = (value) => {
        setPassword(value)
        console.log(password)
    }

    return (
        <>
        <Box backgroundImage={'https://www.vialeoes.com.br/wp-content/uploads/2016/12/fundo_crianca.jpg'} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} height={'100vh'}>
            <Box className={styles['__box']} width={'600px'} p={50} borderRadius={'5px'} display={'flex'} alignItems={'center'} flexDirection={'column'}>
            <Image src={'https://www.vialeoes.com.br/wp-content/uploads/2016/12/logo_vialeoes.png'} width={'150px'} marginBottom={'40px'} />
            <Text textAlign={'center'} fontWeight={'bold'} fontSize={'20px'} color={'viaLeoes'}>LOGIN</Text>
            <FormControl maxW={'400px'} marginTop={'20px'} display={'flex'} flexDirection={'column'}>
                <Input variant={'flushed'} color={'viaLeoes'} placeholder={'Digite o código de acesso...'} defaultValue={password} onChange={(e) => handlePasswordchange(e.target.value)}/>
                <Button marginTop={'20px'} color={'#fff'} colorScheme='teal' backgroundColor={'viaLeoes'} onClick={() => handleLogin()}>Entrar</Button>
            </FormControl>
            </Box>
            
        </Box>
        </>
    )
}