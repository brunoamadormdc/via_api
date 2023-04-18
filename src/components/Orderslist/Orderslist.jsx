import { useState, useCallback } from "react";
import useOrders from "@/hooks/useOrders";
import { Container, Select, FormLabel, Input, Text, Button, Badge, Grid, GridItem } from "@chakra-ui/react";
import { Search2Icon } from '@chakra-ui/icons'


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
    'por_passeio': '[line_items[0].name]',
    'por_status': 'status'
}

const typeSearch = {
    '[billing.first_name]': 'por_nome',
    '[billing.email]': 'por_email',
    '[line_items[0].name]': 'por_passeio',
    'status': 'por_status'
}


export default function OrdersList() {

    const { ord_filter, getOrders, _orders_search, setOrders_search, data, setData } = useOrders()

    const [busca, setBusca] = useState(false)

    const handleSearchitens = (value, name) => {
        setData({ ...data, [name]: value })
    }

    const handleSetfield = (value) => {
        setOrders_search({ ..._orders_search, field: value })
    }

    const handleSetvalue = (value) => {
        setTimeout(() => {
            setOrders_search({ ..._orders_search, value: value })
        }, 1500)

    }

    const searchOrders = useCallback(
        () => {
            getOrders(data)
        },

    );

    const handleSetbusca = useCallback(
        () => {
            setBusca(!busca)
        }

    );

    return (
        <div>

            {busca ?
                <Container maxW='full' marginTop={'20px'} marginBottom={'20px'} display={'flex'} p={'0'} flexDirection={'column'} alignItems={'center'}>
                    <Text fontWeight={'bold'} color={'viaLeoes'} textTransform={'uppercase'}>Pesquisar na base de dados por:</Text>
                    <Grid borderRadius={'5px'} maxW={'100%'} templateColumns='repeat(12, 1fr)' gap={10} marginTop={'30px'} marginBottom={'30px'}>
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
                            </Select>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <FormLabel>Ítens por página.</FormLabel>
                            <Input variant='flushed' placeholder="Ítens por pág." defaultValue={data.per_page} onChange={(e) => handleSearchitens(e.target.value, 'per_page')} /></GridItem>
                        <GridItem colSpan={1}>
                            <FormLabel>&nbsp;</FormLabel>
                            <Button width={'100%'} colorScheme={'teal'} onClick={() => searchOrders()} >Buscar</Button></GridItem>
                    </Grid>
                    {ord_filter != null ?
                        <Grid borderRadius={'5px'} maxW={'100%'} templateColumns='repeat(12, 1fr)' gap={10} marginTop={'30px'} marginBottom={'30px'}>

                            <GridItem colSpan={9}>
                                <FormLabel >Filtrar os resultados da busca atual...</FormLabel>
                                <Input defaultValue={_orders_search.value} onChange={(e) => handleSetvalue(e.target.value)} variant={'flushed'} width={'100%'} />
                            </GridItem>
                            <GridItem colSpan={3}>
                                <FormLabel >Selecionar o campo</FormLabel>
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

                        </Grid>
                        : null}
                </Container>
                : null}

            <Container backgroundColor={'#eee'} position={'relative'} maxW='full' marginTop={'0px'} p={'0'}>

                <div onClick={() => handleSetbusca()} style={{ position: 'absolute', top: '25px', right: '20px', cursor: 'pointer' }}>
                    <Search2Icon w={6} h={6} color="#fff" />
                </div>
                <Grid padding={'30px'} maxW={'100%'} color={'#fff'} fontSize={'12px'} backgroundColor={'teal'} fontWeight={'600'} templateColumns='repeat(14, 1fr)' gap={2} borderBottom={'1px solid #eee'}>
                    <GridItem colSpan={1}>Nº Pedido</GridItem>
                    <GridItem colSpan={3}>Nome do Responsável</GridItem>
                    <GridItem colSpan={3}>Nome do Aluno</GridItem>
                    <GridItem colSpan={1}>RG Aluno</GridItem>
                    <GridItem colSpan={1}>Telefone</GridItem>
                    <GridItem colSpan={2}>Passeio</GridItem>
                    <GridItem colSpan={1}>Série</GridItem>

                    <GridItem colSpan={1}>Data do pagamento</GridItem>
                    
                    <GridItem colSpan={1}>Status</GridItem>
                </Grid>




                {ord_filter != null ?
                    ord_filter.list.map((order) => (
                        <Grid padding={'30px'} maxW={'100%'} fontSize={'12px'} templateColumns='repeat(14, 1fr)' key={order['ID']} gap={2} borderBottom={'1px solid teal'}>

                            <GridItem display={'flex'} alignItems={'center'} colSpan={1}>{order['Número do pedido']}</GridItem>
                            <GridItem display={'flex'} alignItems={'center'} colSpan={3}>{order['Nome do cliente']}</GridItem>
                            <GridItem display={'flex'} alignItems={'center'} colSpan={3}>{order['Nome do aluno']}</GridItem>
                            <GridItem display={'flex'} alignItems={'center'} colSpan={1}>{order['RG']}</GridItem>
                            <GridItem display={'flex'} alignItems={'center'} colSpan={1}>{order['Telefone']}</GridItem>
                            <GridItem display={'flex'} alignItems={'center'} colSpan={2}>{order['Passeio']}</GridItem>
                            <GridItem display={'flex'} alignItems={'center'} colSpan={1}>{order['Série']} {order['Turma']}</GridItem>

                            <GridItem display={'flex'} alignItems={'center'} colSpan={1}>{order['Data do pagamento']}</GridItem>

                            <GridItem display={'flex'} alignItems={'center'} colSpan={1}>
                                <Badge borderRadius={'5px'} padding={'2'} colorScheme={buttonColor[order['Status']]}>{order['Status']}</Badge>

                            </GridItem>


                        </Grid>
                    ))
                    : null}

            </Container>

        </div>
    )
}