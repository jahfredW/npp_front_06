/* importation des modules nécessaires */
import Axios from './caller.service.js'

/** fonction de récupération du mote de passe utilisateur. 
 * 
 * @param {string} email 
 */
const passwordRecovery = (email) => {
    let formdata = new FormData;
    formdata.append('email', email)

    return Axios.post('/api/password', formdata )


}

export const passwordService = {
    passwordRecovery
}