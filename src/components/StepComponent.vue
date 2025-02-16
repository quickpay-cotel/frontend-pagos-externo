<template>
  <form-wizard shape="square" nextButtonText="Siguiente" backButtonText="Atras" color="#ff8a24"
    @on-change="handleStepChange" finishButtonText="Finalizar">
    <tab-content title="Buscar Cliente">
      <v-card class="mx-auto my-8 rounded-card">
        <BuscarClienteComponent></BuscarClienteComponent>
      </v-card>
    </tab-content>
    <tab-content title="Seleccionar Deudas">
      <v-card v-if="deudasStore.datosDeudas && deudasStore.datosDeudas.length > 0" class="mx-auto my-8 rounded-card pa-4" max-width="100%">
        <SeleccionarPagoComponent></SeleccionarPagoComponent>
      </v-card>
      <v-card v-else class="mx-auto my-8 rounded-card">
        <v-alert border="top" type="warning" variant="outlined" prominent>
          No existe Deudas
        </v-alert>
      </v-card>
    </tab-content>
    <tab-content title="Pagar">
      <v-row align="center" v-if="deudasStore.deudaSeleccionado.length > 0">
        <DatosParaFacturaComponent></DatosParaFacturaComponent>
        <v-col cols="12" md="6">
          <PagosSeleccionadosComponent></PagosSeleccionadosComponent>
        </v-col>

        <v-col cols="12" md="6">
          <PagarComponent></PagarComponent>
        </v-col>
      </v-row>
      <v-alert v-else border="top" type="warning" variant="outlined" prominent>
        No existe Deudas Seleccionados
      </v-alert>
    </tab-content>
  </form-wizard>
</template>

<script setup>
import BuscarClienteComponent from "./BuscarClienteComponent.vue";
import SeleccionarPagoComponent from "./SeleccionarPagoComponent.vue";
import PagosSeleccionadosComponent from "./PagosSeleccionadosComponent.vue";
import PagarComponent from "./PagarComponent.vue";
import DatosParaFacturaComponent from "./DatosParaFacturaComponent.vue"

// Manejar el evento onComplete

import { useDeudasStore } from "@/stores/useDeudasStore";
const deudasStore = useDeudasStore();

const handleStepChange = async (prevIndex, nextIndex) => {
  if (nextIndex == 1) { // seleccion de pagos
    await deudasStore.buscarDeudas({
      contratoId: deudasStore.datosPersona.contratoId ? deudasStore.datosPersona.contratoId.toString() : 0,
      servicioId: deudasStore.datosPersona.id_servicio ? deudasStore.datosPersona.id_servicio.toString() : 0
    });
    if (deudasStore.error) {
      basicMessage(deudasStore.error)
    }
  }
}
</script>
