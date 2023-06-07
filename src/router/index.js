// import { AppVue } from '../views/public/index';
import VueJwtDecode from 'jwt-decode';


import { utils } from './../utils/functions';
import { LayoutVue, SignupVue, HomeView, DownloadVue, DownloadBlob,
AlbumPublicVue, OrderVue, SuccessPaymentVue, CancelPaymentVue, InvoiceVue, AddressUpdateVue } from '@/views/public/index';
import { LoginVue, UserDashboardVue, UserPasswordVue, UserPasswordSuccessVue, UserPseudoUpdateVue, 
    UserEmailUpdateVue, UserBannishedPageView } from '@/views/auth/index';
import { AdminDashboard, UploadPictures, AlbumFormVue, 
    ReadAlbumsVue, AlbumCardVue, AlbumListeVue, PictureVue, AlbumUpdateVue, 
UsersManagementView, UserDetailView } from '@/views/admin';

import { AlbumCard, AlbumListe }  from '@/components';

import { createWebHistory, createRouter } from 'vue-router';
import { decodeTokenValidity } from '@/../_helpers/auth_guard'
import { decodeAdmin } from '@/../_helpers/auth_guard'


const routes = [
    // routes publiques 
    {
        path: '/',
        name: 'public',
        component: LayoutVue,
        children: [ 
            { path: '/', name: 'homeView', component: HomeView },
            { path: '/album', name: 'albumPublicVue', component: AlbumPublicVue, props: (route) => ({ 
                category: route.query.category || null,
                type: route.query.type || null,
                beginDate: route.query.beginDate || null,
                endDate: route.query.endDate || null,
                albumName: route.query.albumName || null,
              }) },
            { path: '/album/read/:id(\\d+)', name: 'read-public-album', component: AlbumListeVue },
            { path: '/signup', name: 'signup', component: SignupVue },
            { path: '/login', name: 'login', component: LoginVue },
            { path: '/order', name: 'order', component: OrderVue },
            { path: '/download', name: 'download', component: DownloadVue },
            { path: '/downloadBlob/:id(\\d+)', name: 'downloadBlob', component: DownloadBlob },
            { path: '/picture/:id(\\d+)', name: 'picturePublicView', component: PictureVue },
            { path: '/success/:id(\\d+)', name: 'success', component: SuccessPaymentVue },
            { path: '/failure', name: 'failure', component: CancelPaymentVue },
            { path: '/adress-update/:id(//d+)?', name: 'address-update', component: AddressUpdateVue, props: (route) => ({ orderId: route.query.orderId }) },
            ]
    },
   
    {
        path: '/auth',
        name: 'authentification',
        component: LayoutVue,
        children : [
            // { path: 'login', name: 'login', component: LoginVue },
            { path: 'dashboard', name: 'user-dashboard', component: UserDashboardVue },
            { path: 'password', name: 'user-password', component: UserPasswordVue },
            { path: 'bannished', name: 'bye-bye', component: UserBannishedPageView },
            { path: 'invoice/:id(\\d+)', name: 'invoice', component: InvoiceVue },
            { path: 'passwordSuccess', name: 'user-password-success', component: UserPasswordSuccessVue },
            { path: 'pseudo-update/:id(//d+)', name: 'pseudo-update', component: UserPseudoUpdateVue },
            { path: 'email-update/:id(//d+)', name: 'email-update', component: UserEmailUpdateVue },
        ]
    },
    {
        path: '/admin',
        name: 'admin',
        children : [
            { path: 'uploadPictures', name: 'upload-pictures', component: UploadPictures },
            { path: 'dashboard', name: 'dashboard', component: AdminDashboard },
            { path: 'album', name: 'read-albums', component: ReadAlbumsVue },
            { path: 'users', name: 'users-management', component: UsersManagementView, props: (route) => ({ 
                beginDate: route.query.beginDate || null,
                endDate: route.query.endDate || null,
                pseudo: route.query.pseudo || null,
              }) },
            { path: 'users/:id', name: 'users-detail', component: UserDetailView, props: (route) => ({
                userPseudo: route.query.userPseudo || null
            }) },
            { path: 'album/create/:id(\\d+)?', name: 'create-album', component: AlbumFormVue },
            { path: 'album/read/:id(\\d+)', name: 'read-admin-album', component: AlbumListeVue },
            { path: 'album/update/:id(\\d+)', name: 'update-album', component: AlbumUpdateVue },
            

        
            { path: 'picture/:id(\\d+)', name: 'pictureAdminViewView', component: PictureVue },

        ]
    },

    {path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = new createRouter({
    history : createWebHistory(),
    routes,
});




// guard avec le store pour horodatage du token
// to.matched pour vérifier url admin 
router.beforeEach( (to, from) => {
        decodeTokenValidity(to);    
        decodeAdmin(to);
        
        
        
    
    
    // // simpleDecode(to);
    // // instanciation du magasin
    // const tokenStore = useTokenStore();
    // // Si un token est dans le localStorage on le parse

    //     // tokenStore.getTokenValidity()
    //     // On en deduit l'étatde l'application
    //     let statusApp = tokenStore.getStatusApp;
    //     console.log(statusApp);
    //     // si status expiré, on remove le token et on redirige
    //     if (statusApp === "expired"){
    //         alert('Session expirée, vous devez vous reconnecter');
    //         localStorage.removeItem('token')
    //         tokenStore.setStatusApp("public");
    //         next('/');
    //     }
    //     // Si le status est en mode user et qu'on tombe sur url admin, 
    //     // On bloque et on redirige 
    //     if((statusApp === "userMode" || statusApp === 'public') && to.matched[0].name === 'admin'){
    //         alert('Url non autorisée!')
    //         next('/');
    //     }
    //     else next()
    
    });



export default router;
