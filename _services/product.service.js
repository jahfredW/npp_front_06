/* importation des modules nécessaires */
import Axios from './caller.service.js'

// obtenir le prix d'un type de photo par son id
const getProductPriceById = (productId) => {
    return Axios.get('api/products/' + productId + '/price');
}

// obtenir al liste de tous les produits 
const getAllProducts = () => {
    return Axios.get('api/products');
}

// supprimer un type par son id 
const delete_product_by_id = (productId) => {
    return Axios.delete('api/products/' + productId);
}

// récupérer un type (product) via son id 
const get_product_by_id = (productId) => {
    return Axios.get('api/products/' + productId); 
}

// mettre à jour un type (product) via son id
const update_product_by_id = (productId, formdata) => {
    return Axios.put('api/products/' + productId, formdata, { headers : { 'Content-Type': 'application/json'}} )
}

// création d'un type (product) via son id 
const create_product = (formdata) => {
    return Axios.post('api/products', formdata, { headers : { 'Content-Type': 'application/json'}} )
}

export const productService = {
    getProductPriceById,
    getAllProducts,
    delete_product_by_id,
    get_product_by_id,
    update_product_by_id,
    create_product
}