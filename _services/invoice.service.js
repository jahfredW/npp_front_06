/* importation des modules nécessaires */
import Axios from './caller.service.js'

const getInvoice = (orderId) => {
    return Axios.get('/api/invoice/' + orderId)
}

export const invoiceService = {
    getInvoice
}