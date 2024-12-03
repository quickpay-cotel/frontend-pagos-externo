/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    //defaultTheme: 'dark',
    defaultTheme: 'light',  // Define el tema claro como el predeterminado
    themes: {
      light: {
        colors: {
          background: '#FCFCFC', // Color de fondo para el body
        },
        primary: '#F78F33',  // Personaliza tu color primario
        secondary: '#424242',  // Personaliza tu color secundario
      },
    },
  },
})
