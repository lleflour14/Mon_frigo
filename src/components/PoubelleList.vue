<template>
    <v-row dense>
    <v-col
    v-for="produit in listeFrigo"
    :key="produit.id"
    cols="12"
    sm="6"
    md="3"
    lg="2"
    xl="2">
    <v-card color="#1867C0">
    <v-img
    :src="produit.URL_photo"
    height="200px"
    cover
    ></v-img>
    <v-card-title>
    {{ produit.nom }}
    </v-card-title>
    <v-btn @click="supprProduit(produit.id)">
    <img src="@/assets/delete-circle.svg" alt="cercle-poubelle" class="delete"/>
    </v-btn>
    </v-card>
    </v-col>
   </v-row>

</template>

<script setup>
import { onMounted, reactive } from 'vue'
import Produit from "../Produit"
const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/16/produits";
const listeFrigo = reactive([]); //reactive : données surveillée, réagit aux modifs, actualise,

function getProduit(){
    fetch(url)
    .then((response) =>{ return response.json()
    })
    .then( (dataJSON) => { 
        console.log(dataJSON);
        let produits = dataJSON //objet au format json
        listeFrigo.splice(0,listeFrigo.length) // vide la liste de 0 à la taille de ma liste avant actualisations sinon comme que des push il y a duplication
        for (let pr of produits){
            listeFrigo.push(new Produit(pr.id,pr.nom,pr.qte,pr.photo))
        }
      
    })
    .catch( (error) => { // gestion des erreurs
    console.log(error)
    } )
}

function supprProduit(idProd) {
    const fetchOptions = {
    method: "DELETE", // je dis que je veux delete
    };
    fetch(url+"/"+idProd, fetchOptions)
        .then((response) =>{ return response.json()
        })
        .then((dataJSON) => {
            console.log(dataJSON); //renvoie : {"status" : 0 ou 1}, savoir si ça a marché ou non
            getProduit() // récup des données de la BDD (dont le produit suppr)
           })
        .catch((error) => console.log(error));
}

onMounted(()=>{ 
    getProduit()
})
</script>

<style scoped>
.delete{
    height: 30px;
}
</style>