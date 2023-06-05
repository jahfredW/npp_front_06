/* importation des modules nécessaires */
import Axios from './caller.service.js'

// fonction de téléchargement des photographies.
const downloadFile = (title, pictureId) => {
    return Axios({
        method: 'get',
        url: 'https://localhost:8000/api/downloadFile/' + pictureId,
        responseType: 'blob',
      })
}

// fonction qui permet de forcer le DL avec l'utilisation d'un objet Blob
const forceFileDownload = (response, title) => {
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', title + '.jpg')
    document.body.appendChild(link)
    link.click()
  }

export const downloadService = {
    downloadFile,
    forceFileDownload,
}