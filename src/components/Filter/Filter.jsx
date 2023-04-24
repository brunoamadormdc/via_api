import { Grid, GridItem, FormLabel, Input, Select, Button } from '@chakra-ui/react'

export default function Filter({ handleSearchitens, searchOrders, data, searchType, typeSearch}) {
    return (
        <Grid borderRadius={'5px'} maxW={'100%'} templateColumns='repeat(12, 1fr)' gap={10} marginTop={'30px'} marginBottom={'30px'}>
            <GridItem colSpan={6}>
                <FormLabel>Termo da busca</FormLabel>
                <Input variant='flushed' placeholder="Digite o termo..." onBlur={(e) => handleSearchitens(e.target.value, 'search')}></Input>
            </GridItem>
            <GridItem colSpan={3}>
                <FormLabel>Tipo de Busca</FormLabel>
                <Select variant={'flushed'} defaultValue={typeSearch[data.search_type]} onBlur={(e) => handleSearchitens(searchType[e.target.value], 'search_type')} placeholder='Tipo de Busca'>
                    <option value='por_nome'>Nome do Responsável</option>
                    <option value='por_nome_aluno'>Nome do Aluno</option>
                    <option value='por_email'>Email do Responsável</option>
                    <option value='por_passeio'>Nome do Passeio</option>
                </Select>
            </GridItem>
            <GridItem colSpan={2}>
                <FormLabel>Ítens por página.</FormLabel>
                <Input variant='flushed' placeholder="Ítens por pág." defaultValue={data.per_page} onChange={(e) => handleSearchitens(e.target.value, 'per_page')} /></GridItem>
            <GridItem colSpan={1}>
                <FormLabel>&nbsp;</FormLabel>
                <Button width={'100%'} colorScheme={'teal'} onClick={() => searchOrders()} >Buscar</Button>
                </GridItem>
        </Grid>
    )
}