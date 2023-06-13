import { defineStore } from 'pinia';
import VueJwtDecode from 'jwt-decode';
// import { useRouter } from 'vue-router';

// implémentation d'un nouveau magasin 
// définition des propriétés token, pseudo, roles et statusApp
export const useCookieStore = defineStore('getCookie', {
  state: () => ({
    acceptCookie : $cookies.get('acceptCookie'),
    cartIdCookie : $cookies.get('cartId'),
    }),
  // déclaration des getters
  getters: {
    getAcceptCookie : (state) => state.acceptCookie,
    getIdCookie : (state) => state.cartIdCookie,
  },

  // définition des actions
  actions: {

    saveAcceptCookie(cookie){
      this.acceptCookie = cookie;
      $cookies.set('accpetCookie', cookie);
    },

    saveCartIdCookie(cookie){
        this.cartIdCookie = cookie;
        $cookies.set('cartId', cookie);
    },

  }});