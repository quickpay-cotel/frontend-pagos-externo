<template>
    <v-container>
        <form>
            <v-row>
                <v-col cols="12" md="4">
                    <v-select density="compact" variant="outlined" v-model="vCriterioSeleccionado" item-title="text"
                        item-value="id" :items="lstCriterioConsultaDatoCliente" label="Tipo">
                    </v-select>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field variant="outlined" density="compact" v-model="vInstancia"
                        label="Instancia"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-btn class="text-none ms-4 text-white" color="blue-darken-4" rounded="0" variant="flat"
                        @click="buscarDatosCliente()">
                        Manage Cookies
                    </v-btn>
                </v-col>
            </v-row>
            <v-alert v-if="vMensajeError" color="orange" variant="outlined">
                <template v-slot:title>
                    Mensaje
                </template>
                {{ vMensajeError }}
            </v-alert>
        </form>
        <v-row>
            <v-col cols="12" md="4">
                <h5>Nombre</h5>
                {{ vDatosCliente.nombres }}
            </v-col>
            <v-col cols="12" md="4">
                <h5>Servicio</h5>
                {{ vDatosCliente.servicio }}
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios';
const vInstancia = ref('')
const vCriterioSeleccionado = ref('')
const vDatosCliente = ref(null);
const vMensajeError = ref(null);
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
const buscarDatosCliente = async () => {
    let request = {
        criterio: vCriterioSeleccionado.value,
        instancia: vInstancia.value
    };
    vDatosCliente.value = null;
    vMensajeError.value = null;
    try {
        const response = await axios.post('http://localhost:3000/cotel/consulta-datos-cliente', request);
        if (response.data.success) {
            vDatosCliente.value = response.data.result;
        }
    } catch (error) {
        vMensajeError.value = error.response.data.message;
    }
};
</script>