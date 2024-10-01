import { createApp } from 'vue';
import App from './App.vue';
import router from "./router/index";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTrash, faEdit, faCheck);

const app = createApp(App);

// Register FontAwesomeIcon as a global component
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.mount('#app');
