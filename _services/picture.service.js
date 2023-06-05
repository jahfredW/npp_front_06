/* importation des modules nécessaires */
import Axios from './caller.service.js'

let uploadPictures = (credentials) => {
    return Axios.post('api/cloudgoogle', credentials)
}


let updatePictureById = (id, formdata) => {
  return Axios.put('/api/picture/' + id, formdata, { headers : { 'Content-Type': 'application/json'}}) 
}

let deletePictureById = (id) => {
  return Axios.delete('/api/picture/' + id)
}

let getPictureById = (id) => {
  return Axios.get('/api/picture/' + id)
}

let getPictureName = (id) => {
  return Axios.get('/api/picture/' + id + '/name')
}

let getPictureType = (id) => {
  return Axios.get('/api/picture/' + id + '/type')
}


export const pictureService = {
    uploadPictures,
    deletePictureById,
    getPictureById,
    updatePictureById,
    getPictureName,
    getPictureType
  }