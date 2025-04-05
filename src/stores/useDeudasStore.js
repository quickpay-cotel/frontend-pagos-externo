// stores/useCounter.js
import { defineStore } from "pinia";
import { useUtilsStore } from './useUtilsStore.js'
import { ref, watch } from "vue";
import axiosInstance from "@/services/axios";
export const useDeudasStore = defineStore("deudas", () => {
  const datosConsultaPersona = ref(null);
  const datosPersona = ref(null); // datos de la persona
  const datosDeudas = ref([]); // deudas de la persona
  const deudaSeleccionado = ref([]); // deudas seleccionado
  const qrGenerado = ref(null); // qr generado
  const lstComprobantes = ref([]);
  const vEmailComprobante = ref(null);
  const vNroCelular = ref(null);
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


  const actualizarSeleccionados = (index, item) => {
    datosDeudas.value =  datosDeudas.value.map((obj, i) => ({
      ...obj,
      seleccionado: i <= index ? true : false
    }));
    deudaSeleccionado.value = datosDeudas.value.filter(r => r.seleccionado);
  }  // Actualiza el campo seleccionado en el índice actual y todos los anteriores


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
    const utilsStore = useUtilsStore();
    loading.value = true;
    error.value = null;
    datosDeudas.value = null;
    try {
      const response = await axiosInstance.post(`/cotel/consulta-deuda-cliente`, payload);
      let pagosDesordenados = response.data.result;
      if(pagosDesordenados.length){
        let pagosOrdenados = pagosDesordenados.sort((a, b) => utilsStore.parsePeriodo(a.periodo) - utilsStore.parsePeriodo(b.periodo))
        if(deudaSeleccionado.value.length){
          pagosOrdenados = pagosOrdenados.map(obj => {
            const seleccionado = deudaSeleccionado.value.some(pago => pago.codigo_deuda === obj.codigo_deuda);
            return { ...obj, seleccionado };
          });
        }else{
          pagosOrdenados = pagosOrdenados.map(obj => ({ ...obj, seleccionado: false }));
        }
        datosDeudas.value = pagosOrdenados;
      }
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

  const verificarEstadoQR = async (pPayload) => {
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
  const obtenerComprobantes = async (pAlias) => {
    loading.value = true;
    error.value = null;
    lstComprobantes.value = [];

    try {
      const response = await axiosInstance.get(`/pagos/obtener-comprobantes/${pAlias}`);
      lstComprobantes.value = response.data.result;

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
    lstComprobantes,
    lstCriterioConsultaDatoCliente,
    qrGenerado,
    vEmailComprobante,
    vNroCelular,
    datosConsultaPersona,
    actualizarSeleccionados,
    limpiarDeudas,
    buscarDatosPersona,
    buscarDeudas,
    generarQr,
    verificarEstadoQR,
    obtenerComprobantes
  };
});
