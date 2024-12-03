<template>
    <h6 class="text-subtitle-1">Elige las facturas o servicios que deseas pagar. Puedes revisar los detalles, como montos y fechas, antes de proceder</h6> 
    <br>
    <v-list>
      <!-- Encabezado -->
      <v-list-item v-for="item in pagos">
        <v-row >
          <v-col cols="4" class="font-weight-medium">Tipo de Servicio</v-col>
          <v-col cols="4" class="font-weight-thin">{{ item.tipoServicio }}</v-col>
        </v-row>
        <v-row >
          <v-col cols="4" class="font-weight-medium">Servicio</v-col>
          <v-col cols="4" class="font-weight-thin">{{ item.servicio }}</v-col>
        </v-row>
        <v-row >
          <v-col cols="4" class="font-weight-medium">Periodo</v-col>
          <v-col cols="4" class="font-weight-thin">{{ item.periodo }}</v-col>
        </v-row>
        <v-row >
          <v-col cols="4" class="font-weight-medium">Cantidad</v-col>
          <v-col cols="4" class="font-weight-thin">{{ item.cantidad }}</v-col>
        </v-row>
        <v-row >
          <v-col cols="4" class="font-weight-medium">Concepto</v-col>
          <v-col cols="4" class="font-weight-thin">{{ item.concepto }}</v-col>
        </v-row>
        <v-row >
          <v-col cols="4" class="font-weight-medium">subTotal</v-col>
          <v-col cols="4" class="font-weight-thin">{{ item.subTotal }}</v-col>
        </v-row>
    
        
        <v-divider></v-divider>
      </v-list-item>
    
    </v-list>

</template>
<script setup>
const pagos = [
    {
      tipoServicio: 'Pago de Pensione',
      servicio: `Pago Mensualidad`,
      periodo: 'Febrero 2024',
      cantidad: 1,
      concepto: 'Mensualidad Febrero',
      subTotal: 900,
    },
    {
      tipoServicio: 'Pago de Pensione',
      servicio: `Pago Mensualidad`,
      periodo: 'Marzo 2024',
      cantidad: 1,
      concepto: 'Mensualidad Febrero',
      subTotal: 900,
    },
    {
      tipoServicio: 'Pago de Pensione',
      servicio: `Pago Mensualidad`,
      periodo: 'Abril 2024',
      cantidad: 1,
      concepto: 'Mensualidad Febrero',
      subTotal: 900,
    },
]
</script>