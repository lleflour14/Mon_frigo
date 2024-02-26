<template>
        <div class="form">
        <form name="recherche" @submit.prevent="rechercheProduit(recherche)" disabled>
        <input type="text" v-model="recherche" placeholder="Que recherchez-vous ?" required />
        <button type="submit">Rechercher</button>
        </form>
        </div>
        <br><br>
        <v-row dense>
        <v-col
        v-for="produit in listeRecherche"
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
        <h3>{{ produit.qte }}</h3>
        </v-card>
        </v-col>
       </v-row>

    </template>
    
<style scoped>


form {
  display: flex;
  align-items: center;
}


input{
    padding: 10px;
  background-color: #1867C0; 
  color: white;

  border: #4682B4;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: black; 
  color: white;
  border-radius: 25px;
}

::placeholder {
  color: white;
  opacity: 1;
}

</style>


    <script setup>
    import { reactive } from 'vue'
    import Produit from "../Produit"
    const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/16/produits";

const listeRecherche= reactive([]);

function rechercheProduit(motcle){
    fetch(url+"?search="+motcle)
        .then((response) =>{ return response.json()
        })
        .then( (dataJSON) => { 
            console.log(dataJSON);
            let produits = dataJSON //objet au format json
            listeRecherche.splice(0,listeRecherche.length) // vide la liste de 0 à la taille de ma liste avant actualisations sinon comme que des push il y a duplication
            for (let pr of produits){
                listeRecherche.push(new Produit(pr.id,pr.nom,pr.qte,pr.photo))
            }
          
          
        })
        .catch( (error) => { // gestion des erreurs
        console.log(error)
        } )

        document.recherche.reset();
}

    </script>