/* importation des modules nécessaires */
import Axios from './caller.service.js'



// fonction de récupération des informations de l'utilisateur connecté. 
let getUser = () => {
    return Axios.get('api/user');
}

//fonction de getUsers with pagination 
const getUsersWithPagination = (limit, page, pseudo = null, beginDate = null, endDate = null) => {
    let request = 'api/users'
    if(limit){
        request += '?limit=' + limit;
    } 

    if (page){ 
        request += '&page=' + page;
    }

    if(pseudo){
        request += '&pseudo=' + pseudo
    }

    if(beginDate){
        request += "&beginDate=" + beginDate;
    }

    if(endDate){
        request += "&endDate=" + endDate;
    }

    return Axios.get(request);
}

// fcontion de récupération de tous les utilisateurs
let getUsers = (idUser = null) => {
    if (idUser != null){
        return Axios.get('api/users/' + idUser);
    } else {
        return Axios.get('api/users');
    }
    
}

const userChangeStatus = (userId = null, formData = null) => {
    let request = 'api/users';
    if (userId != null){
        request += '/' + userId;
    }
    if (formData != null){
        return Axios.put(request, formData);
    }
    return Axios.put(request)
}

const deleteUserById = (userId) => {
    return Axios.delete('api/users/' + userId)
}


let addUser = (credentials) => {
    return Axios.post('api/admin/adduser', credentials)
}


let signup = (credentials) => {
    return Axios.post('api/signup', credentials)
}

// fonction  de login 
let login = (credentials) => {
    return Axios.post('api/login_check', credentials)
}

// fonction de logout
let logout = () => {
    localStorage.removeItem('token');
}

// Sauvegarde du token
let saveToken = (token) => {
    localStorage.setItem('token', token);
}

let getToken = () => {
    return localStorage.getItem('token');
}

// Fonction de vérification de connection
let isLogged = () => {
    let token = localStorage.getItem('token');
    return !! token; /* le !! permet de tranformer une chaine en booleen  */
}

// Fonction de mise à jour du pseudo 
let userUpdate = (userId, credentials) => {
    return Axios.put('api/user/' + userId, credentials, { headers : { 'Content-Type': 'application/json'}, })
}


// permet d'exporter sous la forme d'un objet les 
// expressions de fonction. 
// A bien mettre à la fin du module ! 
export const accountService = {
    login,
    logout, 
    saveToken,
    isLogged,
    getToken,
    signup, 
    getUser,
    userUpdate, 
    getUsers,
    userChangeStatus,
    deleteUserById,
    getUsersWithPagination,
    
    // addUser,
}