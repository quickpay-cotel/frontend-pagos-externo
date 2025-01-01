<template>
  <v-container>
    <v-card border="opacity-40 sm" class="mx-auto pa-5" max-width="360" rounded="xl" variant="text">
      <h2>Métodos de Pago</h2>
      <a @click="generarQR()">
        <img src="../assets/pago/pago_qr.png" width="120px">
      </a>
      <img width="200px" v-if="generadoQr" src="../assets/pago/generando_qr.gif" alt="genera qr" />
      <div v-if="!generadoQr && deudasStore && deudasStore.qrGenerado">
        <img :src="deudasStore.qrGenerado.imagen_qr" alt="Pago" width="100%" />
        <v-row no-gutters>
            <div>
              Descarga QR
              <v-icon icon="mdi mdi-arrow-collapse-down" @click="descargaQr(deudasStore.qrGenerado.imagen_qr)"></v-icon>
            </div>
            <div>
              Código reserva:{{ deudasStore.qrGenerado.id_transaccion_reserva }}
            </div>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>
<script setup>
import { useDeudasStore } from '@/stores/useDeudasStore';
import { ref } from 'vue';
const deudasStore = useDeudasStore();
const generadoQr = ref(false);
import { basicMessage } from '@/utils/swalAlert';
const generarQR = async () => {
  generadoQr.value = true;
  let request = {
    consultaDatosClienteDto: {
      criterio: deudasStore.datosConsultaPersona.criterio,
      instancia: deudasStore.datosConsultaPersona.instancia
    },
    codigoDeudas: deudasStore.deudaSeleccionado
  };
  await deudasStore.generarQr(request);
  if (deudasStore.error) {
    basicMessage(deudasStore.error)
    return;
  }
  generadoQr.value = false;
}
const descargaQr = (linkSource) => {
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = "qr.jpg";
  downloadLink.click();
};
</script>
