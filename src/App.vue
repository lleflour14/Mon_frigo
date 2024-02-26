<template>
  <v-app>
  <!-- une barre de navigation -->
  <v-app-bar color="#1867C0" density="compact">
  <v-btn to="/PageCuisine">Ma cuisine</v-btn>
  </v-app-bar>
  <v-main>
  <v-container class="page">
  <!-- les "composant view" s'afficheront ici -->
  <RouterView />
  </v-container>
  </v-main>
  </v-app>
</template>

<script setup>
  
</script>
