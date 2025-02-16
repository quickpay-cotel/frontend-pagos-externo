<template>
  <v-container>
    <v-card class="pa-5" border="opacity-40 sm" rounded="xl" variant="text">
      <h2 style="text-align: center;">Datos para facturación</h2><br>
      <div v-if="deudasStore.deudaSeleccionado.length">
        <v-row>
          <v-col><span class="font-weight-bold">Nombre</span>&nbsp;&nbsp;<span class="font-weight-thin">
              {{ deudasStore.deudaSeleccionado[0].nombre_factura }}</span>
          </v-col>
          <v-col> <span class="font-weight-bold">Número Documento</span>&nbsp;&nbsp;<span class="font-weight-thin"> {{
            deudasStore.deudaSeleccionado[0].tipo_documento + ' ' + deudasStore.deudaSeleccionado[0].numero_documento }}</span>
          </v-col>
          <v-col> <v-text-field v-model="deudasStore.vEmailComprobante" color="primary" label="Correo Electrónico"
              variant="underlined"></v-text-field>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>
<script setup>
import { useDeudasStore } from '@/stores/useDeudasStore';
const deudasStore = useDeudasStore();

</script>
<style lang="css" scoped>
/* Cada elemento de detalle */
.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
}
</style>
