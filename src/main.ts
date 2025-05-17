import '@/app/styles/main.scss'

import { createApp } from 'vue'
import { router } from '@/app/router'

import App from './app/App.vue'
import { Chart } from 'chart.js'
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const app = createApp(App)

app.use(router)
app.mount('#app')
