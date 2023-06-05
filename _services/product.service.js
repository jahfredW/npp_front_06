/* importation des modules nécessaires */
import Axios from './caller.service.js'

const getProductPriceById = (productId) => {
    return Axios.get('api/products/' + productId + '/price');
}

const getAllProducts = () => {
    return Axios.get('api/products');
}

export const productService = {
    getProductPriceById,
    getAllProducts
}