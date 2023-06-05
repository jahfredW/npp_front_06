import VueJwtDecode from 'jwt-decode';
import router from '@/router';
import { useTokenStore } from '@/stores/tokenStore';
// module qui permet de vérifier les infos du token, 
// afin de sécuriser les routes. 



// vérifie si le token est toujours valide ( date )
export function decodeTokenValidity(to){
    const tokenStore = useTokenStore();
    let token = localStorage.getItem('token');
    if(token){
        let decoded = VueJwtDecode(token);
        let date = decoded.exp;
        if(Date.now() > date * 1000){
            localStorage.removeItem('token');
            tokenStore.disconnect();
            alert('Vous devez vous reconnecter')
            router.push('/auth/login');
            location.reload();
    }
}}


// vérifie si le token appartient à l'administrateur.
export function decodeAdmin(to){

    // récupération du token dans le localStorage
    let token = localStorage.getItem('token');
    if(token){
        console.log(token);
        let decoded = VueJwtDecode(token)
        let roles = decoded.roles

        if(!roles.includes('ROLE_ADMIN') && to.matched[0].name === 'admin'){
            alert('Url non autorisée!')
            router.push('/');
        }
    } else {
        if (to.matched[0].name === 'admin' || to.matched[0].name === 'auth'){
            alert('Url non autorisée!')
            router.push('/');
        }
    }       
   
}

 

