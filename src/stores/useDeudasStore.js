// stores/useCounter.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axiosInstance from '@/services/axios';
export const useDeudasStore = defineStore('deudas', () => {

    const datosPersona = ref(null);
    const datosDeudas = ref(null);
    const deudaSeleccionado = ref(null);

    const loading = ref(false); 
    const error = ref(null);
    const lstCriterioConsultaDatoCliente = ref([
        {
            id: "C",
            text: "Contrato"
        },
        {
            id: "T",
            text: "Teléfono"
        }
    ])

    const buscarDatosPersona = async (paylod) => {
        loading.value = true;
        error.value = null;
        datosPersona.value=null;
        try {
            const response = await axiosInstance.post('/cotel/consulta-datos-cliente',paylod);
            datosPersona.value  = response.data.result;
          } catch (err) {
            error.value = err.message;
          } finally {
            loading.value = false;
          }
    };
    const buscarDeudas = async (pContratoId) => {
        loading.value = true;
        error.value = null;
        datosDeudas.value=null;
        try {
            const response = await axiosInstance.get(`/cotel/consulta-deuda-cliente/${pContratoId}`);
            datosDeudas.value  = response.data.result;
          } catch (err) {
            error.value = err.message;
          } finally {
            loading.value = false;
          }
    };


    // Devolver el estado y las acciones
    return {
        loading,error,
        datosPersona,datosDeudas,deudaSeleccionado,lstCriterioConsultaDatoCliente,
        buscarDatosPersona,buscarDeudas
    };
});
