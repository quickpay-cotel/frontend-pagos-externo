<template>
  <!-- Encabezado -->
  <v-data-table  v-model="deudasStore.deudaSeleccionado" :headers="headers" :items="deudasStore.datosDeudas"
    v-model:expanded="expanded" show-expand item-value="codigo_deuda"     show-select>
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <v-card class="ma-5">
            <v-table density="compact">
              <thead>
                <tr>
                  <th class="text-left">
                    codigo_item
                  </th>
                  <th class="text-left">
                    descripcion_item
                  </th>
                  <th class="text-left">
                    cantidad
                  </th>
                  <th class="text-left">
                    monto_unitario
                  </th>
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
</template>
<script setup>
import { useDeudasStore } from '@/stores/useDeudasStore';
const deudasStore = useDeudasStore();
const expanded = ref([]);

const headers = [
  {
    align: 'start',
    key: 'codigo_deuda',
    sortable: false,
    title: 'Código deuda',
  },
  { key: 'nombre_factura', title: 'Nombre Factura' },
  { key: 'numero_documento', title: 'CI' },
  { key: 'periodo', title: 'Periodo' },
  { key: 'monto', title: 'Monto' },
  //{ key: 'reconexion', title: 'Reconexión' },
  { key: 'mensaje_deuda', title: 'Mensaje Deuda' },
  { key: 'mensaje_contrato', title: 'Mensaje Contrato' },

  //{ key: 'actividad', title: 'Actividad' }
];
const headersDetalle = [
  { key: 'descripcion_item', value: 'Descripción' },
  { key: 'monto_unitario', value: 'Monto Unitario' },
  { key: 'monto_item', value: 'Monto Item' },
  //{ key: 'genera_factura', value: 'Genera Factura?' }

]

</script>
