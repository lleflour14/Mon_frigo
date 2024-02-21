<template>
  <v-app>
  <!-- une barre de navigation -->
  <v-app-bar color="primary" density="compact">
  <v-btn to="/PageCuisine">Ma cuisine</v-btn>
  <v-btn to="/PageFrigo">Mon frigo</v-btn>
  <v-btn to="/PagePoubelle">Jeter des produits</v-btn>
  <v-btn to="/PageDrive">Acheter des produits</v-btn>
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
  //
</script>
