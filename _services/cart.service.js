/* importation des modules nécessaires */
import Axios from './caller.service.js'


// ajout d'un item au panier 
const addToCart = (itemId) => {
  return Axios.get('/api/cart/' + itemId, { withCredentials: true })
}

const deleteToCart = (itemId = null) => {
  let request = '/api/cart';
  if(itemId != null){
    request += '/' + itemId;
  }
  return Axios.delete(request, { withCredentials: true})
}

const deleteCartLine = (itemId = null) => {
  let request = 'api/cartline';
  if (itemId != null){
    request += "?itemId=" + itemId;
  }
  return Axios.delete(request, { withCredentials: true });
}

export const cartService = {
    addToCart,
    deleteToCart,
    deleteCartLine,
  }