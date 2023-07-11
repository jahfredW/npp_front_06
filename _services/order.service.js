/* importation des modules nécessaires */
import Axios from './caller.service.js'
import { useCartStore } from '../src/stores/cartStore.js'
import { useTokenStore } from '../src/stores/tokenStore.js'


// méthode de passage de commande
const makeOrder = (formdata) => {
    return Axios.post('/api/order', formdata, { headers : { 'Content-Type': 'multipart/form-data'} },)
}

// get an order by userId
const getOrder = (userId) => {
    const params = new URLSearchParams();
    params.append('userId', userId);

    return Axios.get('/api/order', { params } )
    
}

// get an oderLine by orderId
const getOrderlines = (orderId) => {
    return Axios.get('/api/orderlines/' + orderId)
}

// get an order by order Id
const getOrderById = (orderId) => {
    return Axios.get("/api/order/" + orderId);
}

// update an order
const orderValidation = (orderId) => {
    return Axios.put("/api/order/" + orderId, { headers : { 'Content-Type': 'application/json'}})
}

// delete an order
const deleteOrder = (orderId) => {
    return Axios.delete("/api/order/" + orderId)
}


export const orderService = {
    makeOrder,
    getOrder,
    getOrderById,
    orderValidation,
    getOrderlines,
    deleteOrder
}