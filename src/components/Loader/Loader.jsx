import loader from './Loader.module.scss'
import { Stack, Spinner } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import { loader as loaderAtom } from '@/store/loader'

export default function Loader() {

    const _loader = useRecoilValue(loaderAtom)

    return (
        <>
            {_loader ?
                <div className={loader['__loader']}>
                    <Stack direction='row' spacing={4}>
                        <Spinner size='xl' />
                    </Stack>
                </div>
                : null}       
        </>

    )
}