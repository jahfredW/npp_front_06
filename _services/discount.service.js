/* importation des modules nécessaires */
import Axios from './caller.service.js'

const getDiscount = (discountId = null) => {
    if(discountId){
        return Axios.get('api/discounts/' + discountId);
    } else {
        return Axios.get('api/discounts');
    }
    
}

const getDiscountByOrderId = (orderId = null) => {
    return Axios.get('api/discounts/order/' + orderId);
}

const deleteDiscount = (discountId) => {
    return Axios.delete('api/discounts/' + discountId);
}

const discount_update = (discountId, formdata) => {
    return Axios.put('api/discounts/' + discountId, formdata, { headers : { 'Content-Type': 'application/json'}} );
}

const discount_create = (formdata) => {
    return Axios.post('api/discounts', formdata, { headers : { 'Content-Type': 'application/json'}} )
}




export const discountService = {
    getDiscount,
    getDiscountByOrderId,
    deleteDiscount,
    discount_update,
    discount_create
}