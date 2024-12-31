<!-- src/components/Header.vue -->
<template>
  <v-app-bar app :elevation="0" absolute color="#FCFCFC">
    <v-container>
     <img src="https://www.cotel.bo/wp-content/uploads/2021/11/login-2.png" alt="" width="100px">
    </v-container>
    <template v-slot:append>
      <v-menu transition="slide-x-transition" open-on-hover elevation="0">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-help" color="orange" v-bind="props"></v-btn>
        </template>
        <v-card class="pa-2">
          <a href="https://wa.me/59178873940" target="_blank"><v-btn icon="mdi-whatsapp" color="green" v-bind="props"
              elevation="0"></v-btn>
          </a>Soporte técnico para relizado el pago<br><br>
          <v-btn icon="mdi-file-pdf-box" v-bind="props" elevation="0" color="red"></v-btn>
          Manual de Usuario
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
</template>
<script setup>

</script>

<style scoped></style>
