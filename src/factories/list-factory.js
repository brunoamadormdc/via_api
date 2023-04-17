import moment from 'moment'

export class ListFactory {
    constructor() {
        this.list = [];
        this.totalPages = null
        this.totalOrders = null
        this.totalAcc = 0
    }

    getHeaders(headers) {
        this.totalPages = parseInt(headers['x-wp-totalpages'])
        this.totalOrders = parseInt(headers['x-wp-total'])
    }
    
    
    filterListData(list) {
        if(list.length == 0) return 
        this.totalAcc = 0
        this.list = list.map(item => {
            this.totalAcc += parseInt(item?.total) || 0
            return {
                'ID': item.id,
                'Passeio': item?.line_items[0]?.name || '',
                'Preço': item?.line_items[0]?.price || 0,
                'Passeio ID': item?.line_items[0]?.product_id || '',
                'CPF': item?.billing?.cpf || '',
                'Email': item?.billing?.email || '',
                'Telefone': item?.billing?.phone || '',
                'Endereço': item?.billing?.address_1 || '',
                'state': item?.billing?.state || '',
                'Nome do cliente': `${item?.billing?.first_name || ''} ${item?.billing?.last_name || ''}`,
                'RG': item?.billing?.rg || '',
                'Data': dataConvert(item?.date_created) || '',
                'Data do pagamento': dataConvert(item?.date_paid) || '',
                'Número': item?.billing?.number || '',
                'Cidade': item?.billing?.city || '',
                'Método de pagamento': item?.payment_method_title || '',
                'URL de pagamento': item?.payment_url || '',
                'Valor': item?.total || 0,
                'ID da transação': item?.transaction_id || '',
                'Status': item?.status ? fromStatus[item?.status] : '',
                'Aguardando pagamento': item?.needs_payment.toString() ? needs_payment[item?.needs_payment.toString()] : '',
                'Série':item?.meta_data.filter(val => val.key == '_billing_serie')[0].value || '',
                'Nome do aluno':item?.meta_data.filter(val => val.key == '_billing_nome_aluno')[0].value || '',
                'Turma':item?.meta_data.filter(val => val.key == '_billing_turma')[0].value || '',
            }
            
        })
    }
}

const dataConvert = (value) => {
    if(value == '') return ''
    if(value == null) return ''
    if(value == undefined) return ''
    return moment(value).format('DD/MM/YYYY')
}

const toSnake = {
    'ID': 'id',
    'Passeio': 'name',
    'Preço': 'price',
    'CPF': 'cpf',
    'Email': 'email',
    'Telefone': 'phone',
    'Endereço': 'address',
    'state': 'state',
    'Nome do cliente': 'name',
    'RG': 'rg',
    'Data': 'date_created',
    'Data do pagamento': 'date_paid',
    'Número': 'number',
    'Cidade': 'city',
    'Método de pagamento': 'payment_method_title',
    'URL de pagamento': 'payment_url',
    'Valor': 'total',
    'ID da transação': 'transaction_id',
    'Status': 'status',
        
}

const needs_payment = {
    'true': 'Não Pago',
    'false': 'Pago'
}

const fromStatus = {
    'pending': 'Pendente',
    'processing': 'Processando',
    'on-hold': 'Em espera',
    'completed': 'Concluído',
    'cancelled': 'Cancelado',
    'refunded': 'Reembolsado',
    'failed': 'Falhou',
    'trash': 'Lixo'
}