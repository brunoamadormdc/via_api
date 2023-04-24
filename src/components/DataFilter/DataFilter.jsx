import { Grid, GridItem, FormLabel, Input, Select } from '@chakra-ui/react'

export default function DataFilter( {handleSetfield, handleSetvalue, _orders_search}) {
    return (
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
                    <option value='Status'>Status</option>
                </Select>
            </GridItem>

        </Grid>
    )
}