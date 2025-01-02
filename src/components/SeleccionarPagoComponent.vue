<template>
  <!-- Encabezado -->
  <v-data-table v-if="!isMobile" v-model="deudasStore.deudaSeleccionado" :headers="headers"
    :items="deudasStore.datosDeudas" v-model:expanded="expanded" show-expand item-value="codigo_deuda" show-select>
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <v-card class="ma-5">
            <v-table density="compact">
              <thead>
                <tr>
                  <th class="text-left">codigo_item</th>
                  <th class="text-left">descripcion_item</th>
                  <th class="text-left">cantidad</th>
                  <th class="text-left">monto_unitario</th>
                  <!--<th class="text-left">
                    genera_factura
                  </th>-->
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in item.detalle" :key="item.codigo_item">
                  <td>{{ item.codigo_item }}</td>
                  <td>{{ item.descripcion_item }}</td>
                  <td>{{ item.cantidad }}</td>
                  <td>{{ item.monto_unitario }}</td>
                  <!--<td>{{ item.genera_factura }}</td>-->
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </td>
      </tr>
    </template>
  </v-data-table>
  <div v-if="isMobile">
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="(item, index) in deudasStore.datosDeudas" :key="index">
          <v-list-item-content>
            <!-- Campos del registro -->
            <v-list-item-subtitle>
              <v-card border="opacity-40 sm" class="mx-auto pa-2" max-width="100%" rounded="xl" variant="text">
                <v-col cols="12">
                  <v-switch color="primary" v-model="deudasStore.deudaSeleccionado" :value="item.codigo_deuda"
                    label="Seleccionar"></v-switch>
                  <v-row align="center" class="pa-1">
                    <span class="font-weight-bold ">Nombre</span><br>
                    <span class="font-weight-thin ">{{ item.nombre_factura }}</span>
                  </v-row>
                  <v-row align="center" class="pa-1">
                    <span class="font-weight-bold ">CI&nbsp;</span>
                    <span class="font-weight-thin ">{{ item.numero_documento }}</span>
                  </v-row>
                  <v-row align="center" class="pa-1">
                    <span class="font-weight-bold ">Periodo&nbsp;</span>
                    <span class="font-weight-thin ">{{ item.periodo }}</span>
                  </v-row>
                  <v-row align="center" class="pa-1">
                    <span class="font-weight-bold ">Monto&nbsp;</span>
                    <span class="font-weight-thin ">{{ item.monto }}</span>
                  </v-row>
                  <v-row align="center" class="pa-1">
                    <span class="font-weight-bold ">Mensaje Deuda</span><br>
                    <span class="font-weight-thin ">{{ item.mensaje_deuda }}</span>
                  </v-row>
                </v-col>
              </v-card>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
  <!-- Lista para pantallas móviles -->
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useDeudasStore } from "@/stores/useDeudasStore";
const deudasStore = useDeudasStore();
const expanded = ref([]);
// Detectar si es móvil
const isMobile = ref(window.innerWidth <= 768);
const updateScreenSize = () => {
  isMobile.value = window.innerWidth <= 768;
};
onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});
// =============

const headers = [
  {
    align: "start",
    key: "codigo_deuda",
    sortable: false,
    title: "Código deuda",
  },
  { key: "nombre_factura", title: "Nombre Factura" },
  { key: "numero_documento", title: "CI" },
  { key: "periodo", title: "Periodo" },
  { key: "monto", title: "Monto" },
  //{ key: 'reconexion', title: 'Reconexión' },
  { key: "mensaje_deuda", title: "Mensaje Deuda" },
  { key: "mensaje_contrato", title: "Mensaje Contrato" },

  //{ key: 'actividad', title: 'Actividad' }
];
const headersDetalle = [
  { key: "descripcion_item", value: "Descripción" },
  { key: "monto_unitario", value: "Monto Unitario" },
  { key: "monto_item", value: "Monto Item" },
  //{ key: 'genera_factura', value: 'Genera Factura?' }
];
</script>
