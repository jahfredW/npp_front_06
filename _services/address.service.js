/* importation des modules nécessaires */
import Axios from './caller.service.js'

const addressCreate = (credentials) => {
    return Axios.post('api/address', credentials)
}

const addressUpdate = ( userId ,credentials ) => {
    return Axios.put('/api/address?userId=' + userId, credentials, { headers: { 'Content-Type' : 'application/json'}} )
}

const getAddressByUserId = (userId) => {
    return Axios.get('/api/address?userId=' + userId )
}

const getWholeAddressByUserId = (userId) => {
    return Axios.get('/api/address?userId=' + userId )
}



export const addressService = {
    addressCreate,
    addressUpdate, 
    getAddressByUserId, 
    getWholeAddressByUserId
}