<template>
  <v-app>
    <AppHeaderComponent></AppHeaderComponent>
    <br>
    <br>
    <v-main>
      <v-container class="d-flex justify-center pa-0 ">
        <div width="80%">
          <router-view />
        </div>
      </v-container>
    </v-main>
    <AppFooterComponent />
  </v-app>
</template>

<script setup>

</script>
<style scoped></style>
