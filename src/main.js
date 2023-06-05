import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './../node_modules/bulma/css/bulma.css';
import { createPinia } from 'pinia'
import VueDatePicker from '@vuepic/vue-datepicker';
import { createMetaManager, defaultConfig } from 'vue-meta';
import '@vuepic/vue-datepicker/dist/main.css';



loadFonts()
const pinia = createPinia();
const metaManager = createMetaManager(false, {
  ...defaultConfig, 
  meta: { tag:'meta', nameless: true},
});


const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(metaManager)
  .use(vuetify)
  .component('VueDatePicker', VueDatePicker);
  

app.mount('#app')



// import { Loader } from './components'

  // import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { fas } from '@fortawesome/free-solid-svg-icons';

// library.add(fas);

// import { LoadingDirective } from './directives'
// import { LoadingMixin } from './mixins'

 

 // .component('Loader', Loader)
  // .mixin(LoadingMixin)
  // .directive("loading", LoadingDirective);
  
  // .component('font-awesome-icon', FontAwesomeIcon)


