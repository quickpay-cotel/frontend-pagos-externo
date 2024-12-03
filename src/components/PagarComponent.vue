<template>
    <h6>Verifica la información seleccionada y confirma el pago. Elige tu método de pago preferido para completar la
        transacción de forma segura</h6>
    <v-list>
        <!-- Encabezado -->
        <v-list-item>
            <v-row>
                <v-col cols="4" class="font-weight-medium">Tipo de Servicio</v-col>
                <v-col cols="4" class="font-weight-thin">{{ pago.tipoServicio }}</v-col>
            </v-row>
            <v-row>
                <v-col cols="4" class="font-weight-medium">Servicio</v-col>
                <v-col cols="4" class="font-weight-thin">{{ pago.servicio }}</v-col>
            </v-row>
            <v-row>
                <v-col cols="4" class="font-weight-medium">Periodo</v-col>
                <v-col cols="4" class="font-weight-thin">{{ pago.periodo }}</v-col>
            </v-row>
            <v-row>
                <v-col cols="4" class="font-weight-medium">Cantidad</v-col>
                <v-col cols="4" class="font-weight-thin">{{ pago.cantidad }}</v-col>
            </v-row>
            <v-row>
                <v-col cols="4" class="font-weight-medium">Concepto</v-col>
                <v-col cols="4" class="font-weight-thin">{{ pago.concepto }}</v-col>
            </v-row>
            <v-row>
                <v-col cols="4" class="font-weight-medium">subTotal</v-col>
                <v-col cols="4" class="font-weight-thin">{{ pago.subTotal }}</v-col>
            </v-row>
        </v-list-item>
    </v-list>
</template>
<script setup>
const pago = {
    tipoServicio: 'Pago de Pensione',
    servicio: `Pago Mensualidad`,
    periodo: 'Febrero 2024',
    cantidad: 1,
    concepto: 'Mensualidad Febrero',
    subTotal: 900,
}
</script>