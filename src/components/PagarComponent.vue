<template>
  <v-container>
    <v-card border="opacity-40 sm" class="mx-auto pa-5" max-width="360" rounded="xl" variant="text">
      <h2 v-if="!generandoQr && !datosPago">Métodos de Pago</h2>
      <v-row>
        <v-col>
          <a v-if="!generandoQr && !datosPago" @click="clickGenerarQr()">
            <img src="../assets/pago/pago_qr.png" width="120px">
          </a>
        </v-col>
        <v-col class="mt-4">
          <div v-if="!generandoQr && deudasStore.qrGenerado">
            <v-chip color="#ff8a24" variant="flat" @click="verificarEstadoPagoQr()" >Ya realice el PAGO</v-chip>
          </div>
        </v-col>
      </v-row>



      <!-- cuando esta generando QR -->
      <img width="200px" v-if="generandoQr" src="../assets/pago/generando_qr.gif" alt="genera qr" />



      <!-- cuando ya se ha relizado el pago -->

      <div v-if="!generandoQr && datosPago">

        <v-sheet class="pa-4 text-center mx-auto" elevation="" max-width="600" rounded="lg" width="100%">
          <v-icon class="mb-5" color="success" icon="mdi-check-circle" size="112"></v-icon>
          <h2 class="text-h5 mb-6">La transacción se ha realizado con exito</h2>
          <table>
            <tr style="font-size: 10px;">

              <th>Monto</th>
              <th>Fecha Procesado</th>

            </tr>
            <tr style="font-size: 10px;">

              <td>{{ datosPago.monto + ' ' + datosPago.moneda }}</td>
              <td>{{ datosPago.fechaproceso }}</td>

            </tr>
          </table>
          <br>
          <p class="mb-4 text-medium-emphasis text-body-2">
            Gracis por utilizar nuestra plataforma ahor apuedes descargar el comprobante</p>
          <v-divider class="mb-4"></v-divider>

          <div class="text-end">
            <v-btn class="text-none" color="success" variant="flat" width="100%" rounded
              @click="clickDescargarComprobante(deudasStore.qrGenerado.alias)">
              Comprobante
            </v-btn>
          </div>
        </v-sheet>
      </div>
      <!-- cuando ya ha generado QR y existe de datos de QR generado -->
      <div v-else-if="!generandoQr && deudasStore.qrGenerado">
        <img :src="deudasStore.qrGenerado.imagen_qr" alt="Pago" width="100%" />
        <v-row no-gutters>
          <div>
            Descarga QR
            <v-icon icon="mdi mdi-arrow-collapse-down" @click="descargaQr(deudasStore.qrGenerado.imagen_qr)"></v-icon>
          </div>
          <div>
            Código reserva:{{ deudasStore.qrGenerado.id_transaccion_reserva }}
          </div>
          <div v-if="respSocket">
            Mensaje: {{ respSocket ? respSocket.mensaje : '' }}
          </div>
        </v-row>
      </div>

    </v-card>
  </v-container>
</template>
<script setup>
import { useDeudasStore } from '@/stores/useDeudasStore';
import { ref, onMounted } from 'vue';
const deudasStore = useDeudasStore();
const generandoQr = ref(false);
const datosPago = ref(null);
import { basicMessage, showCustomAlert } from '@/utils/swalAlert';
const url_sockete = import.meta.env.VITE_WS_URL;
const url_api = import.meta.env.VITE_API_URL
const respSocket = ref(null);
import { io } from "socket.io-client";
onMounted(() => {
  const socket = io(url_sockete);
  socket.on("connect", () => {
    console.log("sokete conectado");
    console.log(url_sockete);
  });
  socket.on("notification", (event) => {
    respSocket.value = null;
    if (event) {
      setTimeout(() => {
        if (deudasStore.qrGenerado.alias == event.alias) {
          if (event.mensaje == 'PROCESANDO PAGO') {
            deudasStore.loading = true;
            deudasStore.smsLoading = event.mensaje
          }
          else if (event.mensaje == 'PAGO REALIZADO') {
            deudasStore.loading = false;
            datosPago.value = event.datosPago
          }
          else {
            deudasStore.loading = false;
          }
          respSocket.value = event;
        }
      }, 1000);
    }
  });
});
const clickDescargarComprobante = async (alias) => {
  const pdfUrl = url_api + '/reportes/generar-recibo/' + alias;
  window.open(pdfUrl, '_blank');
}
const clickGenerarQr = async () => {
  if (deudasStore.qrGenerado) {
    let result = await showCustomAlert('Generar QR', 'ya existe un QR generado, desea continuar con generar nuevo QR?');
    if (result.isConfirmed) {
      generarQR();
    }
  } else {
    generarQR();
  }
}

const generarQR = async () => {
  generandoQr.value = true;
  let request = {
    consultaDatosClienteDto: {
      criterio: deudasStore.datosConsultaPersona.criterio,
      instancia: deudasStore.datosConsultaPersona.instancia
    },
    codigoDeudas: deudasStore.deudaSeleccionado
  };
  if (deudasStore.qrGenerado) {
    request.transaccionReservado = deudasStore.qrGenerado.id_transaccion_reserva
  }
  await deudasStore.generarQr(request);
  if (deudasStore.error) {
    basicMessage(deudasStore.error)
  }
  generandoQr.value = false;
}
const descargaQr = (linkSource) => {
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = "qr.jpg";
  downloadLink.click();
};
const verificarEstadoPagoQr = async () =>{
  if(!deudasStore.qrGenerado.alias){
    basicMessage("QR no esta generado");
    return ;
  }
  await deudasStore.verificarEstadoQR({
    alias:deudasStore.qrGenerado.alias
  });
  if (deudasStore.error) {
    basicMessage(deudasStore.error)
    return;
  }
}
</script>
