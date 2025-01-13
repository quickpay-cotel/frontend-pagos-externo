// stores/useCounter.js
import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "@/services/axios";
export const useDeudasStore = defineStore("deudas", () => {
  const datosConsultaPersona = ref(null);
  const datosPersona = ref(null); // datos de la persona
  const datosDeudas = ref([]); // deudas de la persona
  const deudaSeleccionado = ref([]); // deudas seleccionado
  const qrGenerado = ref(null); // qr generado

  const loading = ref(false);
  const smsLoading = ref(null);
  const error = ref(null);
  const lstCriterioConsultaDatoCliente = ref([
    {
      id: "C",
      text: "Contrato",
    },
    {
      id: "T",
      text: "Teléfono",
    },
  ]);

  const limpiarDeudas = () => {
    datosPersona.value = null;
    datosDeudas.value = null;
  }
  const buscarDatosPersona = async (paylod) => {
    loading.value = true;
    error.value = null;
    datosPersona.value = null;
    try {

        datosConsultaPersona.value = paylod;
        const response = await axiosInstance.post("/cotel/consulta-datos-cliente",
          paylod
        );
        //console.log(response);
        datosPersona.value = response.data.result;
        console.log("todo ok");
        console.log(response.data);

    } catch (err) {
      // Manejar el error
      if (err.response) {
        // Acceder al mensaje del backend
        error.value = err.response.data.message || "Error desconocido del servidor";
      } else {
        error.value = "Error de red o problema desconocido";
      }
      loading.value = false;
    } finally {
      loading.value = false;
    }
  };
  const buscarDeudas = async (payload) => {
    loading.value = true;
    error.value = null;
    datosDeudas.value = null;
    try {
      const response = await axiosInstance.post(`/cotel/consulta-deuda-cliente`, payload);
      datosDeudas.value = response.data.result;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  const generarQr = async (pPayload) => {
    console.log("generando QR");
    loading.value = true;
    error.value = null;
    //qrGenerado.value = null;
    try {
      const response = await axiosInstance.post(`/cotel/generar-qr`, pPayload);
      qrGenerado.value = response.data.result;
    } catch (err) {
      // Manejar el error
      if (err.response) {
        // Acceder al mensaje del backend
        error.value = err.response.data.message || "Error desconocido del servidor";
      } else {
        error.value = "Error de red o problema desconocido";
      }
      loading.value = false;
    } finally {
      loading.value = false;
    }
  };

  const verificarEstadoQR = async (pPayload) =>{
    loading.value = true;
    error.value = null;

    try {
      await axiosInstance.post(`/pagos/estado-pago-qr`, pPayload);
    } catch (err) {
      // Manejar el error
      if (err.response) {
        // Acceder al mensaje del backend
        error.value = err.response.data.message || "Error desconocido del servidor";
      } else {
        error.value = "Error de red o problema desconocido";
      }
      loading.value = false;
    } finally {
      loading.value = false;
    }

  }
  // Devolver el estado y las acciones
  return {
    loading,
    smsLoading,
    error,
    datosPersona,
    datosDeudas,
    deudaSeleccionado,
    lstCriterioConsultaDatoCliente,
    qrGenerado,
    datosConsultaPersona,
    limpiarDeudas,
    buscarDatosPersona,
    buscarDeudas,
    generarQr,
    verificarEstadoQR
  };
});
