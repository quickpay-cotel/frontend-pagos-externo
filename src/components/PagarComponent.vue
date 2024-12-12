<template>
    <h6>Verifica la información seleccionada y confirma el pago. Elige tu método de pago preferido para completar la
        transacción de forma segura</h6>
    <v-container>
        <v-row>
            asasas
            <!-- Columna 1 -->
            <v-col cols="12" sm="6">
                <v-card>
                    <v-row>
                        <v-col cols="4" class="font-weight-medium">Tipo de Servicio</v-col>
                        <v-col cols="4" class="font-weight-thin">xxxxx</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" class="font-weight-medium">Servicio</v-col>
                        <v-col cols="4" class="font-weight-thin">xxxxx</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" class="font-weight-medium">Periodo</v-col>
                        <v-col cols="4" class="font-weight-thin">xxxx</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" class="font-weight-medium">Cantidad</v-col>
                        <v-col cols="4" class="font-weight-thin">xxxx</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" class="font-weight-medium">Concepto</v-col>
                        <v-col cols="4" class="font-weight-thin">xxx</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" class="font-weight-medium">subTotal</v-col>
                        <v-col cols="4" class="font-weight-thin">xxxx</v-col>
                    </v-row>
                </v-card>
            </v-col>
            <!-- Columna 2 -->
            <v-col cols="12" sm="6">
                <v-btn class="text-none mb-4" color="indigo-darken-3" size="x-large" variant="flat"
                    @click="generarQR()">
                    Generar QR
                </v-btn>
                {{ imagenBase64 }}
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
const imagenBase64 = ref('')

// Definimos un método
const generarQR = async () => {
    try {
        console.log("ingresnado");
        const response = await axios.post('http://localhost:3000/pagos/genera-qr');
        console.log("devueltoo");
        if (response.data.success != 'success') {
            alert(response.data.message)
        } else {
            imagenBase64.value = response.data.result.imagenQr;
        }
    } catch (error) {
        console.error('Hubo un error al obtener los usuarios:', error);
    }
};

</script>
<style scoped></style>