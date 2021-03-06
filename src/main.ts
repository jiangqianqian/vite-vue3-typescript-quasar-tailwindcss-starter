import { createApp } from 'vue'
import App from './App.vue'
import './tailwind.css'

const app = createApp(App)

// install all modules under `modules/`
Object.values(import.meta.globEager('/src/modules/*.ts')).forEach((module) => module.install?.(app))

app.mount('#app')
