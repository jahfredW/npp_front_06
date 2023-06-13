<template>
    <v-container class="container">
      <v-dialog v-model="open"
      transition="dialog-bottom-transition"
      width="auto">
      <v-card>
        <v-card-text>
          Pour télécharger des photos, vous devez accepter les cookies. 
        </v-card-text>
        <v-card-actions class="text-center">
          <v-spacer></v-spacer>
          <v-btn prepend-icon="" color="primary"  @click="checkDialog(false)">Refuser</v-btn>
          <v-btn color="primary" @click="checkDialog(true)">Accepter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>
</template>

<script setup>


import { ref , watch, onMounted } from 'vue';

onMounted( () => {
    console.log(props.openDiag);
    if (props.test === 'home' && ( $cookies.get('acceptCookie' === 'false') || !$cookies.get('acceptCookie'))){
        console.log('ça marche');
        setTimeout(() => {
            open.value = true;
        }, 3000);
    }
});

const props = defineProps({
    test : String,
    default: ''
}, {
    openDiag : Boolean,
    default : false
})

const emit = defineEmits(
    ['dialogSwitch']
);

const open = ref(props.openDiag);


// watch(props.openDiag, (newValue) => {
//     open.value = newValue;
//     console.log('ici');
// })


const checkDialog = (choice) => {
    if(choice){
        $cookies.set('acceptCookie', choice);
    } else {
        $cookies.set('acceptCookie', choice);
    }
    emit('dialogSwitch', false);
    open.value = false;
}

</script>