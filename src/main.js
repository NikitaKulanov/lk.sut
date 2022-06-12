import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import api from "./plugins/api";
import errorHandler from './plugins/errorHandler'
import helpers from "@/plugins/helpers";

import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '833e84cd90830afef052',
    cluster: 'eu',
    forceTLS: true
});


createApp(App)
    .use(store)
    .use(api)
    .use(errorHandler)
    .use(helpers)
    .use(router)
    .mount('#app')

// app.provide('$api', apix);