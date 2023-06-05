/* importation des modules nécessaires */
import Axios from './caller.service.js'


let getAllCategories = () => {
  return Axios.get('/api/category')
}

export const categoryService = {
    getAllCategories
  }