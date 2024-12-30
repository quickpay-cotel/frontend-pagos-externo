<!-- src/components/Header.vue -->
<template>
  <v-app-bar app :elevation="0" absolute color="#FCFCFC">
    <v-container>
      <v-row class="d-flex align-center" no-gutters>
        <!-- Logo a la izquierda -->
        <v-col cols="1" class="text-left">
          <!-- Puedes poner tu logo aquí -->
          <v-img src="http://localhost:3000/entidades/logo/1024" max-width="120"></v-img>
        </v-col>
        <v-col>
          {{ datosEmpresa.nombre }}
        </v-col>
      </v-row>
    </v-container>
    <template v-slot:append>
      <v-menu transition="slide-x-transition" open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-help" color="orange" v-bind="props"></v-btn>
        </template>
        <v-card class="pa-2">
          <v-btn icon="mdi-whatsapp"  v-bind="props"></v-btn>
          Soporte técnico para relizado el pago<br><br>
          <v-btn icon="mdi-file-pdf-box"  v-bind="props"></v-btn>
          Manual de Usuario
        </v-card>
      </v-menu>
      <v-menu transition="slide-x-transition" open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-domain" color="orange" v-bind="props"></v-btn>
        </template>
        <v-card class="pa-2">
          <span>{{ datosEmpresa.telefono }}</span><br>
          <span>{{ datosEmpresa.direccion }}</span><br>
          <span>{{ datosEmpresa.nit }}</span>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const datosEmpresa = ref({});


onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/entidades/1024');
    if (response.data.status != 'success') {
      alert('error')
    } else {
      datosEmpresa.value = response.data.data; // Guardar los datos en la variable reactiva
    }
  } catch (error) {
    console.error('Hubo un error al obtener los usuarios:', error);
  }
});
</script>

<style scoped></style>
