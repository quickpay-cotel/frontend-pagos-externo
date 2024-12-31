<template>
  <v-app>
    <DialogLoadingComponent></DialogLoadingComponent>
    <AppHeaderComponent></AppHeaderComponent>
    <br>
    <br>
    <v-main>
      <v-container class="d-flex justify-center pa-0 ">
        <div width="100%">
          <router-view />
        </div>
      </v-container>
    </v-main>
    <AppFooterComponent />
  </v-app>
</template>

<script setup>
import DialogLoadingComponent from '@/components/DialogLoadingComponent'
</script>
<style scoped></style>
