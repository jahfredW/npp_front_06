import { defineStore } from 'pinia';
import { discountService } from '@/../_services/discount.service';
import VueJwtDecode from 'jwt-decode';

// Implémentation d'un nouveau magasin corresponant au panier client

export const useCartStore = defineStore('cartStore', {
    state: () => ({
        cart : JSON.parse(localStorage.getItem('cart')) || [],
        total: localStorage.getItem('total') || 0,
        discount : JSON.parse(localStorage.getItem('currentDiscount')) || [],
        totalWithDiscount : localStorage.getItem('totalWithDiscount') || 0,
        discountTab : JSON.parse(localStorage.getItem('discountTab')) || [],
        discountComment : localStorage.getItem('discountComment') || "",
        snackText: "",
    }),


    getters: {
        getCart : (state) => state.cart,
        getTotal: (state) => state.total,
        getDiscount: (state) =>  state.discount,
        getTotalWithDiscount: (state) => state.totalWithDiscount,
        getDiscountComment: (state) => state.discountComment,
        getSnack : (state) => state.snackText,
        getDiscountTab: (state) => state.discountTab

    },

    actions: {

        // Fonction exécutée après la création du store
        initializeStore() {
            // Récupérez les données du panier et les réductions depuis `localStorage`
            this.cart = JSON.parse(localStorage.getItem('cart')) || [];
            this.total = localStorage.getItem('total') || 0;
            this.discount = JSON.parse(localStorage.getItem('currentDiscount')) || [];
            this.totalWithDiscount = localStorage.getItem('totalWithDiscount') || 0;
            this.discountTab = JSON.parse(localStorage.getItem('discountTab')) || [];
            this.discountComment = localStorage.getItem('discountComment') || "";

            // Effectuez les calculs nécessaires
            // this.calculTotalPrice();
        },


        // méthode d'ajout au panier
        addToCartLine(idPicture, quantity, price, pictureUrl, idProduct, pictureName){
            // récupération du panier dans localStorage
            let localStorageCart = localStorage.getItem('cart');

            // SI un panier est présent
            if(localStorageCart){
                // JSON.parse -> string to Array
                let cartParse = JSON.parse(localStorageCart);
                // On stocke le panier récup dans this.cart
                this.cart = cartParse;
                
                // On récherche si une ligne aevc le même id photo existe
                const alreadyExists = cartParse.find( cartLine => cartLine.idPicture === idPicture );
                if(alreadyExists){
                    // SI oui alors on incrémente la quantité -> ici on laisse la quantité  
                    alreadyExists.quantity = quantity;
                    this.snackText = "Le produit existe déja";
                }
                else {
                    // sinon on ajoute une nouvelle ligne avec la nouvelle photo
                    this.addToCart(idPicture, price, quantity, pictureUrl, idProduct, pictureName);
                    this.snackText = "Panier mis à jour";
                }
            // Sinon on ajoute la nouvelle ligne.     
            } else {
                this.addToCart(idPicture, price, quantity, pictureUrl, idProduct, pictureName);
                this.snackText = "Panier mis à jour";
            }

            // Puis on converti le tab en chaine de caractères
            // this.setCart(this.cart);
            this.localStorageCartupdate();
           
        },


        // méthode calcul des prix en fonction des réductions en bdd
        calculTotalPrice(){
           
            this.total = 0;
            this.discount = [];
            this.discountComment = "";

            // Tri du tableau discountTab
            // let sortedTab = this.discountTab.slice().sort((a, b) => {
            //     let x = a.articles;
            //     let y = b.articles;

            //     if (x < y) return 1;
            //     if (x > y) return -1;

            //     return 0;
            // });
            this.sortDiscountTab(this.discountTab);
            
            for ( let item of this.discountTab ){
                console.log("item.articles:", item.articles);
                console.log("cart.length:", this.cart.length);
                
                if(item.articles <= this.cart.length){
                    
                    this.discount.push({ 'rate' : item.rate, 'id' : item.id  })
                    this.discountComment = item.title;
                    break;
                }
            }

            for( let index = 0; index < this.cart.length; index++ ){
                this.total =  this.total + this.cart[index].quantity * this.cart[index].price;
            }

            if(this.discount.length > 0){
                this.totalWithDiscount = this.total - ((this.total * this.discount[0]['rate']) / 100);
            }
            
            localStorage.setItem('total', this.total);
            const discountTest = JSON.stringify(this.discount);
            localStorage.setItem("currentDiscount", discountTest);
            localStorage.setItem('totalWithDiscount', this.totalWithDiscount);
            localStorage.setItem('discountComment', this.discountComment);
          
        },

        addToCart(idPicture, price, quantity, pictureUrl, idProduct, pictureName){
            this.cart.push({
                idPicture: idPicture,
                price: price,
                quantity: quantity,
                url: pictureUrl,
                idProduct: idProduct,
                pictureName: pictureName
            });
        },

        /**
         * mise à jour de la quantité d'articles  
         * 
         * @param {int} idPicture représente l'id de la photographie
         * @param {string} option ajout ou suppression 
         * 
         * @returns { void } ne retourne rien 
         */
        updateQuantity(idPicture, option){
            let item = this.cart.find( cartLine => cartLine.idPicture === idPicture);
            console.log(option);
            if (item){
                if(option == "more"){
                    item.quantity += 1;
                } else if( option == "less"){
                    item.quantity -= 1;
                }
            if (item.quantity < 1){
                item.quantity = 1
            };
            }
            
            this.localStorageCartupdate();
        },

        localStorageCartupdate(){
            const testTab = JSON.stringify(this.cart);
            // On met à jour le localStorage 
            localStorage.setItem('cart', testTab);
            this.calculTotalPrice();
        },

        trashCart(){
            this.cart = [];
            this.total = 0;
            this.discount = [];
            this.discountComment = "";
            this.totalWithDiscount = 0;
            localStorage.removeItem('cart');
            localStorage.removeItem('total');
            localStorage.removeItem("currentDiscount");
            localStorage.removeItem('totalWithDiscount');
            localStorage.removeItem('discountComment');

            
            this.localStorageCartupdate();
            this.calculTotalPrice();
           
            
        },

        trashItemFromCart(idPicture){
            let item = this.cart.find( cartLine => cartLine.idPicture === idPicture);
            if (item){
                console.log('ici');
                const itemIndex = this.cart.indexOf(item);
                this.cart.splice( itemIndex, 1 );
            };
            this.localStorageCartupdate();
        
        },

        setCart(cart){
            this.cart = cart;
        },

        // setQuantity(quantity){
        //     this.quantity = quantity;
        // },

        setCartLine(cartLine){
            this.cartLine = cartLine;
        },

        // tri inversé du tableau de remises en fonction du nombres d'articles
        sortDiscountTab(discountTab){
            let sortedTab = discountTab.sort( function(a, b){
                let x = a.articles;
                let y = b.articles;

                if(x < y) return 1;
                if(x > y) return -1;

                return 0;
            })
            this.discountTab = sortedTab;
            console.log(sortedTab);
        },


        setDiscountTab(discountTab){
            this.discountTab = discountTab;
        },

        setDiscount($value){
            this.discount = $value;
        }
    }



});
