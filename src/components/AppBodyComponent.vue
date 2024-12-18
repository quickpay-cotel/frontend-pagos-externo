<template>
  <v-card class="mx-auto my-8 rounded-card" width="1000px" v-if="!deudasStore.datosDeudas">
    <v-container>
      <v-form ref="formBusquedaDeuda">
        <v-row no-gutters>
          <v-col order="4">
            <v-sheet class="pa-2 ma-2">
              <v-select variant="outlined" v-model="consultaDatoPersona.criterio" item-title="text" item-value="id"
                :items="deudasStore.lstCriterioConsultaDatoCliente" label="Seleccione Tipo de Busqueda"
                :rules="[v => !!v || 'Valor requerido']">
              </v-select>
            </v-sheet>
          </v-col>
          <v-col order="4">
            <v-sheet class="pa-2 ma-2">
              <v-text-field variant="outlined" v-model="consultaDatoPersona.instancia"
                :label="!consultaDatoPersona.criterio ? '' : (consultaDatoPersona.criterio == 'C' ? 'Ingrese Numero de Contrato' : 'Ingrese Numero de Teléfono')"
                :rules="[v => !!v || 'Valor requerido']"></v-text-field>
            </v-sheet>
          </v-col>
          <v-col order="4">
            <v-sheet class="pa-2 ma-2">
              <v-btn class="text-none mb-4 text-white" color="orange" size="x-large" variant="flat"
                @click="buscarDeudas()">Buscar
              </v-btn>
            </v-sheet>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
  <v-chip v-if="deudasStore.datosDeudas" color="orange" class="text-white" variant="flat" @click="deudasStore.limpiarDeudas()">
    Buscar otra deuda
  </v-chip>
  <br>
  <v-row no-gutters v-if="deudasStore.datosDeudas">
    <v-col cols="12" md="4">
      <h5>Nombre</h5>
      {{ deudasStore.datosPersona.nombres }}
    </v-col>
    <v-col cols="12" md="4">
      <h5>Servicio</h5>
      {{ deudasStore.datosPersona.servicio }}
    </v-col>
    <v-col cols="12" md="4">


    </v-col>
  </v-row>
  <v-row no-gutters v-if="deudasStore.datosDeudas">
    <v-card variant="text" color="black" border flat class="rounded-card">
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
import { basicMessage } from '@/utils/swalAlert'; // Importa la función

// Crear una referencia para el formulario
const formBusquedaDeuda = ref(null);

const deudasStore = useDeudasStore();
const consultaDatoPersona = ref({
  criterio: '',
  instancia: ''
});
const buscarDeudas = async () => {
  if (formBusquedaDeuda.value) {
    const isValid = await formBusquedaDeuda.value.validate();
    if (isValid.valid) {
      await deudasStore.buscarDatosPersona(consultaDatoPersona.value);
      if (deudasStore.error) {
        basicMessage(deudasStore.error)
        return;
      }
      await deudasStore.buscarDeudas(deudasStore.datosPersona.contratoId);
      if (deudasStore.error) {
        basicMessage(deudasStore.error)
      }
    } else {
      basicMessage('Los datos de busqueda son obligatorios')
    }
  }
}



</script>

<style scoped>
.rounded-card {
  border-radius: 16px;
  /* Redondea las esquinas */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  /* Aplica una sombra personalizada */
}
</style>
