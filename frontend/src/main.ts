import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index' // Ahora sí va a encontrar la carpeta que creaste
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


const app = createApp(App)
app.use(router)
app.mount('#app')