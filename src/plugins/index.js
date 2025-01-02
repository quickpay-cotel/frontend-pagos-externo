/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router/index'
//import piniaPersist from '@/plugins/piniaPersist'; // Importa el plugin
import VueFormWizard from 'vue3-form-wizard';
//pinia.use(piniaPersist); // Usar el plugin de persistencia
export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueFormWizard)
}
