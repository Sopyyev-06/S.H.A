import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import { reveal } from './directives/reveal'
import './styles/main.css'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.directive('reveal', reveal)

app.mount('#app')
