/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import piniaPersist from '@/plugins/piniaPersist'; // Importa el plugin
pinia.use(piniaPersist); // Usar el plugin de persistencia
export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}
