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
        <v-card color="primary">
        <v-img
        :src="produit.URL_photo"
        height="100px"
        cover
        ></v-img>
        <v-card-title>
        {{ produit.nom }}
        </v-card-title>
        <h3>{{ produit.qte }}</h3>
        <v-btn @click="modifQuantite(produit,produit.qte+1)">+</v-btn>
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
    
    function modifQuantite(pr,qte) {
    console.log(pr);
    pr.modif_qte(qte);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(pr),
    };
    console.log(JSON.stringify(pr));
    fetch(url, fetchOptions)
        .then((response) =>{ return response.json();
        })
        .then((dataJSON) => {
            console.log(dataJSON); //renvoie : {"status" : 0 ou 1}, savoir si ça a marché ou non
            getProduit(); //actualisation
        })
        .catch((error) => console.log(error));
    }
    
    onMounted(()=>{ 
        getProduit()
    })
    </script>