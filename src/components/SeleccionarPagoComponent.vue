<template>
  <v-data-table v-if="!isMobile" :headers="headers"
    :items="deudasStore.datosDeudas" v-model:expanded="expanded"
    show-expand item-value="codigo_deuda" >
    <template v-slot:item.seleccionado="{index, item}">
        <v-checkbox @click="deudasStore.actualizarSeleccionados(index,item)" v-model="item.seleccionado" readonly ></v-checkbox>
      </template>
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <v-card class="ma-5">
            <v-table density="compact">
              <thead>
                <tr>
                  <th class="text-left">DETALLE</th>
                  <th class="text-end">CANTIDAD</th>
                  <th class="text-end">MONTO UNITARIO</th>
                  <th class="text-end">MONTO TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="detalle in item.detalle" :key="detalle.codigo_item">
                  <td>{{ detalle.descripcion_item }}</td>
                  <td class="text-end">{{ detalle.cantidad }}</td>
                  <td class="text-end">{{ detalle.monto_unitario }}</td>
                  <td class="text-end">{{ detalle.monto_item }}</td>
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
                    <span class="font-weight-bold ">NOMBRE FACTURA</span><br>
                    <span class="font-weight-thin ">{{ item.nombre_factura }}</span>
                  </v-row>
                  <v-row align="center" class="pa-1">
                    <span class="font-weight-bold ">CI/NIT&nbsp;</span>
                    <span class="font-weight-thin ">{{ item.numero_documento }}</span>
                  </v-row>
                  <v-row align="center" class="pa-1">
                    <span class="font-weight-bold ">PERIODO&nbsp;</span>
                    <span class="font-weight-thin ">{{ item.periodo }}</span>
                  </v-row>
                  <v-row align="center" class="pa-1">
                    <span class="font-weight-bold ">MONTO&nbsp;</span>
                    <span class="font-weight-thin ">{{ item.monto }}</span>
                  </v-row>
                  <v-row align="center" class="pa-1">
                    <span class="font-weight-bold ">SERVICIO</span><br>
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
  /*{
    align: "start",
    key: "codigo_deuda",
    sortable: false,
    title: "Código deuda",
  },*/
  { key: "seleccionado", title: "SELECCIONAR", align: "start", },
  { key: "nombre_factura", title: "NOMBRE FACTURA", align: "start", },
  { key: "numero_documento", title: "CI/NIT", align: "start", },
  { key: "periodo", title: "PERIODO", align: "start", },
  { key: "monto", title: "MONTO", align: "end", },
  //{ key: 'reconexion', title: 'Reconexión' },
  { key: "mensaje_deuda", title: "SERVICIO", align: "start", },
  //{ key: "mensaje_contrato", title: "Mensaje Contrato" },

  //{ key: 'actividad', title: 'Actividad' }
];
</script>
