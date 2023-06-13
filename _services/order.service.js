/* importation des modules nécessaires */
import Axios from './caller.service.js'
import { useCartStore } from '../src/stores/cartStore.js'
import { useTokenStore } from '../src/stores/tokenStore.js'


// méthode de passage de commande
const makeOrder = (formdata) => {
    return Axios.post('/api/order', formdata, { headers : { 'Content-Type': 'multipart/form-data'} },)
}

const getOrder = (userId) => {
    const params = new URLSearchParams();
    params.append('userId', userId);

    return Axios.get('/api/order', { params } )
    
}

const getOrderlines = (orderId) => {
    return Axios.get('/api/orderlines/' + orderId)
}


const getOrderById = (orderId) => {
    return Axios.get("/api/order/" + orderId);
}

const orderValidation = (orderId) => {
    return Axios.put("/api/order/" + orderId, { headers : { 'Content-Type': 'application/json'}})
}


export const orderService = {
    makeOrder,
    getOrder,
    getOrderById,
    orderValidation,
    getOrderlines
}