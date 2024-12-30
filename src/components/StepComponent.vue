<template>
  <form-wizard step-size="xs" ref="step">
    <tab-content title="Buscar Cliente">
      <v-card class="mx-auto my-8 rounded-card" width="1000px">
        <BuscarClienteComponent></BuscarClienteComponent>
      </v-card>
    </tab-content>
    <tab-content title="Seleccionar Deudas">
      <v-card v-if="deudasStore.datosDeudas" class="mx-auto my-8 rounded-card pa-10" width="1000px">
        <SeleccionarPagoComponent></SeleccionarPagoComponent>
      </v-card>
      <v-card v-else class="mx-auto my-8 rounded-card" width="1000px">
        <v-alert border="top" type="warning" variant="outlined" prominent>
          No existe Deudas
        </v-alert>
      </v-card>
    </tab-content>
    <tab-content title="Pagar">
      <v-card class="mx-auto my-8 rounded-card" width="1000px" v-if="deudasStore.deudaSeleccionado">
        <v-row no-gutters>
          <v-col order="4">
            <PagosSeleccionadosComponent></PagosSeleccionadosComponent>
          </v-col>
          <v-col order="4">
            <PagarComponent></PagarComponent>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="mx-auto my-8 " width="1000px" v-else>
        <v-alert border="top" type="warning" variant="outlined" prominent>
          No existe Detalle de pagos
        </v-alert>
      </v-card>
    </tab-content>
  </form-wizard>
</template>

<script setup>
import { FormWizard, TabContent } from "vue3-form-wizard";
import "vue3-form-wizard/dist/style.css";
import BuscarClienteComponent from './BuscarClienteComponent.vue'
import SeleccionarPagoComponent from "./SeleccionarPagoComponent.vue";
import PagosSeleccionadosComponent from "./PagosSeleccionadosComponent.vue";
import PagarComponent from "./PagarComponent.vue";
// Referencia al componente FormWizard
const step = ref(null);
// Manejar el evento onComplete

import { useDeudasStore } from '@/stores/useDeudasStore';
const deudasStore = useDeudasStore();

</script>
