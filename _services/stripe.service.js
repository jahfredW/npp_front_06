/* importation des modules nécessaires */
import Axios from './caller.service.js'

const sessionRetrieve = (stripeSessionId) => {
    return Axios.get("/api/stripe/retrieve/" + stripeSessionId)
}

export const stripeService = {
    sessionRetrieve
}