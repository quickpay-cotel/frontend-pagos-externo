<template>
  <v-app>
    <DialogLoadingComponent></DialogLoadingComponent>
    <AppHeaderComponent></AppHeaderComponent>
    <br>
    <br>
    <v-main>
      <v-container class="responsive-container">
        <div width="100%">
          <router-view />
        </div>
      </v-container>
    </v-main>
    <!--<AppFooterComponent />-->
  </v-app>
</template>

<script setup>
import DialogLoadingComponent from '@/components/DialogLoadingComponent'
</script>
<style scoped>
.responsive-container {
  width: 80%; /* Ancho por defecto */
  margin: 0 auto; /* Centrado */
}

@media (max-width: 600px) {
  /* Cuando la pantalla es de tamaño móvil */
  .responsive-container {
    width: 100%; /* Cambia el ancho a 100% */
  }
}
</style>
