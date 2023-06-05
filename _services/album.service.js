/* importation des modules nécessaires */
import Axios from './caller.service.js'
import { ref } from 'vue'

let getAllAlbums = () => {
    return Axios.get("/api/album")
}

let getAllAlbumsWithPagination = (limit, page, albumName = null, albumCategory = null, albumType = null, beginDate = null, endDate = null) => {
    let request = "/api/album" + "?limit=" + limit + "&page=" + page;
    if(albumName){
        request += "&albumName=" + albumName;
    } 

    if(albumCategory){
        request += "&category=" + albumCategory;
    }

    if(albumType){
        request += "&type=" + albumType;
    }

    if(beginDate){
        request += "&beginDate=" + beginDate;
    }

    if(endDate){
        request += "&endDate=" + endDate
    }
    
    return Axios.get(request);
}

let deleteAlbumById = (albumId) => {
    return Axios.delete('/api/album/' + albumId)
}

let getAlbumById = (albumId, limit, page) => {
    return Axios.get('/api/album/' + albumId + "?limit=" + limit + "&page=" + page)
}

let UpdateAlbumById = (id, formdata) => {
    return Axios.put('/api/album/' + id, formdata, { headers : { 'Content-Type': 'application/json'}}) 
   
}

let useAxios = (params = null, formdata = null, url = null, header = null, method = null) => {
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

    return { res, err} 
   
}




let getOneAlbumInfo = (id) => {
    return Axios.get('/api/album/' + id + '/info');
}

let albumCreate = (albumId = null, credentials, progress) => {
    // send.value = true;
    // const progressRef = ref(0);
    // console.log(credentials.getAll('files[]'));
    // let arrayFiles = credentials.getAll('files[]')
    // let sizeByFile = arrayFiles.map(file => file.size);
    
    // let totalSize = sizeByFile.reduce((acc, curr) => acc + curr, 0);
    // console.log(totalSize);
    // console.log('files', credentials.get('session_name'));
    // let filesTab = Array.from(credentials.entries()).get;
    // console.log(filesTab);
    // let totalSize = Array.from(credentials.get('files[]')).reduce((acc, file) => acc + file.size, 0);
    //     console.log(totalSize);
    if(!albumId){
        return Axios.post('api/album', credentials, {
            onUploadProgress: (progressEvent) => {
              
            // Get the number of bytes loaded for this file
            let loaded = progressEvent.loaded;
            let total = progressEvent.total;
            let progression = Math.round((loaded * 100) / total);
            console.log(`Uploaded ${loaded} bytes of ${total} bytes (${progress}%)`);
            progress.value = progression
             // Find the index of the file being uploaded
          //   const fileIndex = arrayFiles.findIndex(file => file.name === progressEvent.config.data.name);
          //   // Get the size of the file being uploaded
          //   const fileSize = sizeByFile[fileIndex];
          //   // Calculate the progress for this file
          //   const fileProgress = Math.round((loaded / fileSize) * 100);
          //   // Update the progress for this file in the progress array
          //   progress.value[fileIndex] = fileProgress;
      
          //   // Calculate the overall progress as the average of progress for all files
          //   const overallProgress = Math.round(progress.value.reduce((acc, curr) => acc + curr, 0) / progress.value.length);
          //   // Update the progress bar with the overall progress
          //   progressRef.value = overallProgress
              // console.log('total' , progressEvent.total);  
             
            }
          }); 
    } else {
        return Axios.post('api/album/' + albumId, credentials, {
            onUploadProgress: (progressEvent) => {
              
            // Get the number of bytes loaded for this file
            let loaded = progressEvent.loaded;
            let total = progressEvent.total;
            let progression = Math.round((loaded * 100) / total);
            console.log(`Uploaded ${loaded} bytes of ${total} bytes (${progress}%)`);
            progress.value = progression;
            }
          }); 
    }
    
  };


export const albumService = {
    getAllAlbums,
    deleteAlbumById,
    getAlbumById,
    UpdateAlbumById,
    albumCreate,
    getOneAlbumInfo,
    getAllAlbumsWithPagination,
    useAxios
}