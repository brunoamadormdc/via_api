export class ProductsFactory {
    constructor() {
        this.products = [];
        this.totalPages = null
        this.totalProducts = null
    }

    getHeaders(headers) {
        this.totalPages = parseInt(headers['x-wp-totalpages'])
        this.totalProducts = parseInt(headers['x-wp-total'])
    }

    filterListProduct(products) {

    }
    
    

}

