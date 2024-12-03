<template>
  <v-app>
    <AppHeaderComponent></AppHeaderComponent>
    <v-main >
      <v-container
        class="d-flex justify-center pa-0 "
      >
        <v-card
        variant="plain"
        width="1000"
        >
        <router-view />
        </v-card>
      </v-container>
    </v-main>
    <AppFooterComponent />
  </v-app>
</template>

<script setup>

</script>
<style scoped>

</style>