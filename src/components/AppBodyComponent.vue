<template>
  <div class="titulo-fondo-naranja">
    Busqueda de Deuda
  </div>
  <v-row no-gutters>
    <v-col cols="8">
      <v-sheet class="ma-2 pa-2">
        <v-row>
          <v-col cols="12" md="6">
            <v-select variant="outlined" v-model="consultaDatoPersona.criterio" item-title="text" item-value="id"
              :items="deudasStore.lstCriterioConsultaDatoCliente" label="Tipo de servicio">
            </v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field variant="outlined" v-model="consultaDatoPersona.instancia" label="Instancia"></v-text-field>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
    <v-col cols="4">
      <v-sheet class="ma-2 pa-2">
        <v-btn  class="text-none mb-4 text-white" color="orange" size="x-large" variant="flat" @click="buscarDeudas()">
          Consulta Deuda
        </v-btn>
      </v-sheet>
    </v-col>
  </v-row>
  <div class="titulo-fondo-naranja" v-if="deudasStore.datosPersona">
    Datos persona
  </div>
  <v-row no-gutters v-if="deudasStore.datosPersona">
    <v-col cols="12" md="4">
      <h5>Nombre</h5>
      {{ deudasStore.datosPersona.nombres }}
    </v-col>
    <v-col cols="12" md="4">
      <h5>Servicio</h5>
      {{ deudasStore.datosPersona.servicio }}
    </v-col>
  </v-row>
  <div class="titulo-fondo-naranja" v-if="deudasStore.datosDeudas">
    Deudas
  </div>
  <v-row no-gutters v-if="deudasStore.datosDeudas">
    <v-card variant="text" color="black">
      <v-card-text>
        <SeleccionarPagoComponent></SeleccionarPagoComponent>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script setup>
import { ref } from 'vue';
import SeleccionarPagoComponent from './SeleccionarPagoComponent.vue';

import { useDeudasStore } from '@/stores/useDeudasStore';
const deudasStore = useDeudasStore();
const consultaDatoPersona = ref({
  criterio: '',
  instancia: ''
});
const buscarDeudas = async () => {
  await deudasStore.buscarDatosPersona(consultaDatoPersona.value);
  await deudasStore.buscarDeudas(deudasStore.datosPersona.contratoId);
}



</script>

<style scoped>
.titulo-fondo-naranja{

  background-color: rgb(221, 108, 42); /* Fondo azul */
  color: white; /* Texto blanco */
  padding: 10px; /* Espaciado interno */

}
</style>
