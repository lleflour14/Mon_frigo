<template>
    <img src="../assets/shopping.svg" />
    <v-container>Commandez de nouveaux produits ici :</v-container>
    <DriveForm></DriveForm>
    <br><br>
    <v-divider :thickness="13" color="#1867C0" class="border-opacity-50"></v-divider>
    <br><br>
    <img src="../assets/cloud-search.svg" />
    <v-container>Effectuez une recherche sur les éléments déjà présents dans votre frigo :</v-container>
    <RechercheProd></RechercheProd>
</template>

<script setup>
   import DriveForm from "@/components/DriveForm.vue";
   import RechercheProd from '@/components/RechercheProd.vue';
</script>

<style scoped>

    img{
        height: 35px;
    }
</style>