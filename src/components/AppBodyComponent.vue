<template>
  <div class="stepper-container">
    <!-- Contenedor del Stepper -->
    <div class="stepper">
      <div v-for="(step, index) in steps" :key="index" @click="goToStep(index)">
        <v-btn prepend-icon="mdi-check-circle" class="text-none ms-4 text-white"
          :color="(currentStep  === index) ? 'orange' : 'amber-lighten-3'" rounded="0" variant="flat">
          {{ step.title }}
        </v-btn>
      </div>
    </div>

    <!-- Línea entre pasos -->
    <div class="stepper-line"></div>
    <!-- Contenido de los pasos -->
    <div class="stepper-content">
      <v-card variant="text" color="black">
        <v-card-text>
          <v-tabs-window v-model="currentStep">
            <v-tabs-window-item>
              <BuscaClienteComponent></BuscaClienteComponent>
            </v-tabs-window-item>
            <v-tabs-window-item>
              <SeleccionarPagoComponent></SeleccionarPagoComponent>
            </v-tabs-window-item>
            <v-tabs-window-item >
            
              <PagarComponent></PagarComponent>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
      <div class="stepper-line"></div>

      <div>
        <button v-if="currentStep+1 > 1" @click="prevStep" class="prev-button">Anterior</button>
        <button v-if="currentStep+1 < steps.length" @click="nextStep" class="next-button">Siguiente</button>
        <button v-if="currentStep+1 === steps.length" @click="finishStep" class="finish-button">Finalizar</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BuscaClienteComponent from './BuscaClienteComponent.vue';
import SeleccionarPagoComponent from './SeleccionarPagoComponent.vue';
import PagarComponent from './PagarComponent.vue';

// Definimos los pasos con títulos descriptivos
const steps = ref([
  { title: 'Buscar Cliente' },
  { title: 'Seleccionar Pago' },
  { title: 'Pagar' },
]);

// Estado actual del paso
const currentStep = ref(1);

// Función para avanzar al siguiente paso
const nextStep = () => {
  if (currentStep.value < steps.value.length) {
    currentStep.value++;
  }
};

// Función para retroceder al paso anterior
const prevStep = () => {
  if (currentStep.value+1 > 1) {
    currentStep.value--;
  }
};

// Función para saltar a un paso específico
const goToStep = (step) => {
  currentStep.value = step;
};

// Función para finalizar el stepper (si es necesario)
const finishStep = () => {
  alert('¡Proceso completado!');
  currentStep.value = 2; // Reiniciar al primer paso o redirigir a otro lugar
};
</script>

<style scoped>
/* Estilos generales del Stepper */
.stepper-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

/* Contenedor del Stepper */
.stepper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.stepper-step {
  text-align: center;
  padding: 10px;
  background-color: #ffffff;
  color: #1976d2;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  position: relative;
}

.stepper-step.active {
  background-color: #1976d2;
  color: white;
}

.stepper-step.completed {
  background-color: #4caf50;
  color: white;
}

.stepper-step .step-number {
  font-size: 1.5em;
  font-weight: bold;
}

.stepper-step .step-title {
  font-size: 0.9em;
  margin-top: 10px;
  color: #1976d2;
  margin-left: 0px;
  margin-right: 0px;
}

/* Línea entre los pasos */
.stepper-line {
  width: 100%;
  height: 2px;
  background-color: #ebac25;
  margin-top: 20px;
}

/* Estilos del contenido del Stepper */
.stepper-content {
  margin-top: 30px;
}

.step-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  background-color: #f9f9f9;
}

button {
  padding: 10px 20px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}

button:hover {
  background-color: #1565c0;
}

button.prev-button {
  background-color: #999;
}

button.prev-button:hover {
  background-color: #777;
}

button.finish-button {
  background-color: #4caf50;
}

button.finish-button:hover {
  background-color: #388e3c;
}
</style>
