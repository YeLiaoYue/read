import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "minireset.css";
import 'animate.css';

import "jquery"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')