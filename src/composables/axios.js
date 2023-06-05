/* importation des modules nécessaires */
import Axios from '@/../_services/caller.service.js'
import { ref } from 'vue'

export const useAxios = (params = null, formdata = null, url = null, header = null, method = null) => {
    
    const res = ref(null);
    const err = ref(null);
    
    switch (method) {
        case 'put':
            Axios.put(url + params, formdata, { headers : header })
                .then( (response) => {
                    res.value = response
                })
                .catch( ( error) => {
                    err.value = error
                } )
        break;
        }

    return { res, err } 
   
}

