<template>
    <div class="d-flex flex-row justify-content-around">
        <div><strong>Cliquez sur le bouton pour télécharger votre facture au format pdf :</strong></div>
        <v-btn prepend-icon="mdi-file-pdf-box" class="custom-button" @click="exportToPDF">PDF</v-btn>
    </div>
    
        <div ref="document">
            <div id="element-to-convert" >
                <div class="d-flex flex-row justify-content-center my-5">
                    <img width="120" height="120" src="@/assets/images/logo.png" alt="nppLogo"/>
                </div> 
            <v-container class="container text-center">
                <div>Facture numéro : <strong>{{ invoice.factureID }}</strong></div>
                <div> du {{ invoice.createdAt }}</div>
                <v-divider></v-divider>
                <div><i>Adresse de facturation : </i></div>
                <div>{{ invoice.firstname }} {{ invoice.lastname }}</div>
                <div> {{ invoice.address }}</div>
                <div>{{ invoice.postal }} {{ invoice.city }}</div>
                <v-divider></v-divider>
                <div><i>détail de la commande :</i></div>
                <div v-for="article in invoice.details">
                    {{ article.name }} : {{ article.price }} €
                </div>
                <br>
                <div v-if="invoice.discountTitle">
                    <div >Réduction appliquée :</div>
                    <br>
                    <div> {{ invoice.discountTitle }}</div>
                    <br>
                    <div>Total Après remise : {{ invoice.total * 100 }} Euros</div>
                </div>
                <div v-else>
                    <div>Total : {{ invoice.total * 100 }} Euros</div>
                </div>
                
                <v-divider></v-divider>
                <br>
                <div class="text-h5 mb-15">Merci pour votre achat, à bientôt !</div>
            </v-container>
        </div>
        </div>
    

</template>


<script setup>

import { invoiceService } from '@/../_services/invoice.service';
import { orderService } from '@/../_services/order.service';
import { discountService } from '@/../_services/discount.service';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import html2pdf from 'html2pdf.js';

const invoice = ref({});
const route = useRoute()
let orderId = route.params.id;

// hooks 
onMounted( () => {
    getDiscountByOrderId(orderId);
    getInvoiceByOrder(orderId)
    orderLines(orderId);
})




// methods

const getInvoiceByOrder =  (orderId) => {
    invoiceService.getInvoice(orderId)
    .then( (res) => {
        console.log(res.data)
        let data = res.data
        invoice.value.factureID = data[0].number
        invoice.value.createdAt = data[0].CreatedAt.split('T')[0].split('-').reverse().join('-');
        invoice.value.firstname = data[0].address.firstname
        invoice.value.lastname = data[0].address.lastname
        invoice.value.address = data[0].address.address
        invoice.value.postal = data[0].address.postal
        invoice.value.city = data[0].address.city
        invoice.value.country = data[0].address.country
        invoice.value.phone = data[0].address.phone
        invoice.value.total = data[0].total / 100


    })
    .catch( ( err) => {
        console.log(err)
    })
}


const orderLines = (orderId) => {
    orderService.getOrderlines(orderId)
    .then( (res) => {
        console.log(res.data)
        invoice.value.details = res.data
    })
    .catch( (err) => {
        console.log(err)
    })
}

const getDiscountByOrderId = (orderId) => {
    discountService.getDiscountByOrderId(orderId)
    .then( (res) => { 
        console.log(res.data);
        invoice.value.discountTitle = res.data.title
        invoice.value.discountRate = res.data.discountRate
        invoice.value.discountArticles = res.data.articles

    })
    .catch( (err) => {
        console.log(err);
    })
}


const exportToPDF = () => {
    html2pdf(document.getElementById("element-to-convert"), {
        margin : 1,
        fileName: "facture"
    }); 
}
</script>