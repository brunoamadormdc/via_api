import { useState, useCallback } from "react";
import useOrders from "@/hooks/UseOrders";
import { Container, Box, Select, FormLabel, Input, Text, Table, TableContainer, TableCaption, Tbody, Thead, Tr, Th, Td, Button, Badge, Grid, GridItem } from "@chakra-ui/react";



const buttonColor = {
    'Cancelado': 'red',
    'Processando': 'teal',
    'Pendente': 'yellow',
    'Reembolsado': 'messenger'

}

const paymentColor = {
    'Não Pago': 'red',
    'Pago': 'green',
}

const searchType = {
    'por_nome': '[billing.first_name]',
    'por_email': '[billing.email]',
    'por_passeio': '[line_items[0].name]'
}

const typeSearch = {
    '[billing.first_name]': 'por_nome',
    '[billing.email]': 'por_email',
    '[line_items[0].name]': 'por_passeio'
}


export default function OrdersList() {

    const [data, setData] = useState({ per_page: 100, page: 1, search: null, search_type: '[billing.first_name]' })
    
    const { ord_filter, getOrders, _orders_search, setOrders_search } = useOrders()
    
    const handleSearchitens = (value, name) => {
        setData({ ...data, [name]: value })
    }

    const handleSetfield = (value) => {
        setOrders_search({ ..._orders_search, field: value })
    }

    const handleSetvalue = (value) => {
        setTimeout(()=>{
            setOrders_search({ ..._orders_search, value: value })
        },1500)
        
    }

    const searchOrders = useCallback(
        () => {
            getOrders(data)
        }

    );

    return (
        <div>
            <Container maxW='full' marginTop={'20px'} marginBottom={'20px'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Text fontWeight={'bold'} color={'viaLeoes'} textTransform={'uppercase'}>Pesquisar por:</Text>
                <Grid borderRadius={'5px'} maxW={'100%'} templateColumns='repeat(12, 1fr)' gap={10} marginTop={'30px'}>
                    <GridItem colSpan={6}>
                        <FormLabel>Termo da busca</FormLabel>
                        <Input variant='flushed' placeholder="Digite o termo..." onBlur={(e) => handleSearchitens(e.target.value, 'search')}></Input>
                    </GridItem>
                    <GridItem colSpan={3}>
                        <FormLabel>Tipo de Busca</FormLabel>
                        <Select variant={'flushed'} defaultValue={typeSearch[data.search_type]} onBlur={(e) => handleSearchitens(searchType[e.target.value], 'search_type')} placeholder='Tipo de Busca'>
                            <option value='por_nome'>Nome do Responsável</option>
                            <option value='por_email'>Email do Responsável</option>
                            <option value='por_passeio'>Nome do Passeio</option>

                        </Select></GridItem>
                    <GridItem colSpan={2}>
                        <FormLabel>Ítens por página.</FormLabel>
                        <Input variant='flushed' placeholder="Ítens por pág." defaultValue={data.per_page} onChange={(e) => handleSearchitens(e.target.value, 'per_page')} /></GridItem>
                    <GridItem colSpan={1}>
                        <FormLabel>&nbsp;</FormLabel>
                        <Button width={'100%'} colorScheme={'teal'} onClick={() => searchOrders()} >Buscar</Button></GridItem>
                </Grid>
            </Container>



            <Container backgroundColor={'#eee'} maxW='full' marginTop={'20px'}>
                {ord_filter != null ?
                    <Grid padding={'10px'} backgroundColor={'teal'} justifyContent={'center'} width={'100%'} maxW={'100%'} paddingTop={'20px'} paddingBottom={'20px'} fontWeight={'600'} templateColumns='repeat(12, 1fr)' gap={5} borderBottom={'1px solid #eee'}>
                        <GridItem colSpan={2}></GridItem>
                        <GridItem colSpan={5}>
                            <FormLabel color={'#fff'}>Filtrar os resultados de busca...</FormLabel>
                            <Input defaultValue={_orders_search.value} onChange={(e) => handleSetvalue(e.target.value)} variant={'flushed'} width={'100%'} />
                        </GridItem>
                        <GridItem colSpan={3}>
                            <FormLabel color={'#fff'}>Selecionar o campo</FormLabel>
                            <Select variant={'flushed'} defaultValue={_orders_search.field} onBlur={(e) => handleSetfield(e.target.value)} placeholder='Tipo de Busca'>
                                <option value='Nome do cliente'>Nome do Responsável</option>
                                <option value='Nome do aluno'>Nome do Aluno</option>
                                <option value='RG'>RG Aluno</option>
                                <option value='Passeio'>Passeio</option>
                                <option value='Série'>Série</option>
                                <option value='Aguardando pagamento'>Pagamento</option>
                                <option value='Status'>Status</option>
                            </Select>
                        </GridItem>
                        <GridItem colSpan={2}></GridItem>
                    </Grid>
                    : null}

                <Grid padding={'30px'} maxW={'100%'} color={'#fff'} backgroundColor={'viaLeoes'} fontWeight={'600'} templateColumns='repeat(12, 1fr)' gap={2} borderBottom={'1px solid #eee'}>
                    <GridItem colSpan={2}>Nome do Responsável</GridItem>
                    <GridItem colSpan={2}>Nome do Aluno</GridItem>
                    <GridItem colSpan={1}>RG Aluno</GridItem>
                    <GridItem colSpan={3}>Passeio</GridItem>
                    <GridItem colSpan={1}>Série</GridItem>
                    <GridItem colSpan={1}>Pagamento</GridItem>
                    <GridItem colSpan={2}>Status</GridItem>
                </Grid>




                {ord_filter != null ?
                    ord_filter.list.map((order) => (
                        <Grid padding={'30px'} maxW={'100%'} fontSize={'12px'} templateColumns='repeat(12, 1fr)' key={order['ID']} gap={2} borderBottom={'1px solid #eee'}>

                            <GridItem display={'flex'} alignItems={'center'} colSpan={2}>{order['Nome do cliente']}</GridItem>
                            <GridItem display={'flex'} alignItems={'center'} colSpan={2}>{order['Nome do aluno']}</GridItem>
                            <GridItem display={'flex'} alignItems={'center'} colSpan={1}>{order['RG']}</GridItem>
                            <GridItem display={'flex'} alignItems={'center'} colSpan={3}>{order['Passeio']}</GridItem>
                            <GridItem display={'flex'} alignItems={'center'} colSpan={1}>{order['Série']} {order['Turma']}</GridItem>
                            <GridItem display={'flex'} alignItems={'center'} colSpan={1}>
                                <Badge borderRadius={'5px'} padding={'2'} colorScheme={paymentColor[order['Aguardando pagamento']]}>{order['Aguardando pagamento']}</Badge>

                            </GridItem>
                            <GridItem display={'flex'} alignItems={'center'} colSpan={2}>
                                <Button width={'100%'} colorScheme={buttonColor[order['Status']]}>{order['Status']}</Button>
                            </GridItem>


                        </Grid>
                    ))
                    : null}

            </Container>

        </div>
    )
}