<!-- src/views/PaymentDetails.vue -->
<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>{{ payment.name }}</v-card-title>
            <v-card-subtitle>Detalles del pago</v-card-subtitle>
            <v-card-text>
              <p><strong>Monto:</strong> {{ payment.amount }} USD</p>
              <p><strong>Descripción:</strong> {{ payment.description }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="proceedToPayment" color="success">Proceder al pago</v-btn>
              <v-btn to="/" color="error">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';  // Para obtener el parámetro de ruta
  
  const route = useRoute();
  const payment = ref(null);
  
  // Simulamos la obtención de un pago desde una base de datos o API
  onMounted(() => {
    // Usamos el ID del pago desde la URL
    const paymentId = route.params.id;
    
    // Datos simulados del pago seleccionado
    payment.value = {
      id: paymentId,
      name: 'Pago de factura A',
      amount: 50,
      description: 'Este es un pago pendiente por factura A.',
    };
  });
  
  const proceedToPayment = () => {
    // Lógica para proceder con el pago (simulamos el pago aquí)
    alert(`Procediendo al pago de ${payment.value.amount} USD`);
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados si es necesario */
  </style>
  