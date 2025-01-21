<!-- src/components/Header.vue -->
<template>
  <v-app-bar app :elevation="0" absolute color="#FCFCFC" density="prominent">
    <v-container class="d-flex justify-center">
      <img src="https://www.cotel.bo/wp-content/uploads/2021/11/login-2.png" alt="" width="200px">
    </v-container>
    <template v-slot:append>
      <a href="https://wa.me/59178873940" target="_blank"><v-btn  icon="mdi-whatsapp" color="green" v-bind="props"
          elevation="0"></v-btn>
      </a>
    </template>
  </v-app-bar>
</template>
<script setup>

</script>

<style scoped></style>
