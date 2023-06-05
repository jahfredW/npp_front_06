/* importation des modules nécessaires */
import Axios from './caller.service.js'

const getDiscount = (discountId = null) => {
    // if(discountId){
    //     return Axios.get('api/discounts/' + discountId);
    // } else {
        return Axios.get('api/discounts');
    // }
    
}

// const getDiscountByOrderId = (orderId = null) => {
//     return Axios.get('api/discounts/order/' + orderId);
// }


export const discountService = {
    getDiscount,
    // getDiscountByOrderId
}