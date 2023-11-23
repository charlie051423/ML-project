/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import HighchartsVue from 'highcharts-vue'


// Composables
import {createApp} from 'vue'

// Plugins
import {registerPlugins} from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
app.use(HighchartsVue)
// Treemap(HighchartsVue)
