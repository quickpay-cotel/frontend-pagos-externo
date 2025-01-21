<template>
  <v-container>
    <v-form ref="formBusquedaDeuda">
      <v-row >
        <v-col cols="12" md="3">
          <v-sheet class="pa-2 ma-2">
            <v-select variant="outlined" v-model="consultaDatoPersona.criterio" item-title="text" item-value="id"
              :items="deudasStore.lstCriterioConsultaDatoCliente" label="Seleccione Tipo de Busqueda"
              :rules="[v => !!v || 'Valor requerido']" hidden>
            </v-select>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="5">
          <v-sheet class="pa-2 ma-2">
            <v-text-field variant="outlined" v-model="consultaDatoPersona.instancia"
              :label="!consultaDatoPersona.criterio ? '' : (consultaDatoPersona.criterio == 'C' ? 'Ingrese Numero de Contrato' : 'Ingrese Numero de Teléfono')"
              :rules="[v => !!v || 'Valor requerido']" hidden></v-text-field>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="4">
          <v-sheet class="pa-2 ma-2">
            <v-btn class="text-none mb-4 text-white" color="orange" size="x-large" variant="flat" hidden
              @click="buscarDeudas()">Buscar
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
  <v-row v-if="deudasStore.datosPersona" class="pl-10">
    <v-col cols="12" md="3">
      <h5>Nro de Contrato</h5>
      {{ deudasStore.datosPersona.contratoId }}
    </v-col>
    <v-col cols="12" md="5">
      <h5>Nombre</h5>
      {{ deudasStore.datosPersona.nombres }}
    </v-col>
    <v-col cols="12" md="4">
      <h5>Servicio</h5>
      {{ deudasStore.datosPersona.servicio }}
    </v-col>
  </v-row>

  <br>
</template>
<script setup>
import { ref } from 'vue';
import { useDeudasStore } from '@/stores/useDeudasStore';
import { basicMessage } from '@/utils/swalAlert'; // Importa la función
const deudasStore = useDeudasStore();
const formBusquedaDeuda = ref(null);
const consultaDatoPersona = ref({
  criterio: '',
  instancia: ''
});
const buscarDeudas = async () => {
  if (formBusquedaDeuda.value) {
    const isValid = await formBusquedaDeuda.value.validate();
    if (isValid.valid) {

      // limpiando deudas y deudas seleccinados
      deudasStore.datosDeudas = [];
      deudasStore.deudaSeleccionado = [];
      deudasStore.qrGenerado=null;
      let request =
      {
        criterio : consultaDatoPersona.value.criterio,
        instancia : consultaDatoPersona.value.instancia.trim()
      }
      await deudasStore.buscarDatosPersona(request);
      if (deudasStore.error) {
        basicMessage(deudasStore.error)
        return;
      }
      await deudasStore.buscarDeudas({
        contratoId: deudasStore.datosPersona.contratoId ? deudasStore.datosPersona.contratoId.toString() : 0,
        servicioId: deudasStore.datosPersona.id_servicio ? deudasStore.datosPersona.id_servicio.toString() : 0
      });
      if (deudasStore.error) {
        basicMessage(deudasStore.error)
      }
    } else {
      basicMessage('Los datos de busqueda son obligatorios')
    }
  }
}
</script>
