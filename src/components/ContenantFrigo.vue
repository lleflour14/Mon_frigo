<template>
    <div class="monFrigo">
    <v-row dense>
        <v-col class="rangement"
        v-for="produit in listeFrigo"
        :key="produit.id"
        cols="30"
        sm="2"
        >
        <v-card color="#1867C0" class="carte">
        <v-img
        :src="produit.URL_photo"
        height="180px"
        cover
        ></v-img>
        <v-card-title>
        {{ produit.nom }}
        </v-card-title>
        <h4>
        <v-btn @click="modifQuantite(produit,produit.qte-1)">-</v-btn>
        {{ produit.qte }}
        <v-btn @click="modifQuantite(produit,produit.qte+1)">+</v-btn>
        </h4>
        </v-card>
        </v-col>
       </v-row>

    </div>
    </template>

<style scoped>
.monFrigo{
    background-image: url(../assets/frigo_int.png);
    background-repeat: repeat-y;


}

.carte{
    margin-top: 10px;
}

.rangement{
    margin-left: 100px;
}

</style>

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
    console.log(qte);
    if(qte<=0){
        console.log("oui");
        supprProduit(pr.id);
    }
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({id:pr.id,nom:pr.nom,qte:qte,photo:pr.URL_photo}),
    };

    console.log(pr);
    fetch(url, fetchOptions)
        .then((response) =>{ return response.json();
        })
        .then((dataJSON) => {
            console.log(dataJSON); //renvoie : {"status" : 0 ou 1}, savoir si ça a marché ou non
            getProduit(); //actualisation
        })
        .catch((error) => console.log(error));
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