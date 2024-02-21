<script setup>
import { onMounted, reactive } from 'vue'
import Produit from "../Produit"
import Contenant_Frigo from "./ContenantFrigo.vue"
import Poubelle from './PoubelleList.vue'
import Drive from "./DriveForm.vue"

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



function ajoutProduit(n,q,p) { // ce qui est sortie du formulaire
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {
    method: "POST", // je dis que je veux ajouter
    headers: myHeaders,
    body: JSON.stringify({ nom : n,photo:p,qte:q }),
    };
    
    fetch(url, fetchOptions)
        .then((response) =>{ return response.json()
        })
        .then((dataJSON) => {
            console.log(dataJSON); //renvoie : {"status" : 0 ou 1}, savoir si ça a marché ou non
            getProduit() // récup des données de la BDD (dont le new "produit" ajouté)
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


<template>   
 <br/>
 <Drive @addProd="ajoutProduit"></Drive>

 <ul>
    <Contenant_Frigo 
     v-for="pr in listeFrigo" 
     :key=[pr.id]
     :produit="pr"
     :modifQuantite="modifQuantite"
     ></Contenant_Frigo>
 </ul>

 <ul>
    <Poubelle
     v-for="pr in listeFrigo" 
     :key=[pr.id]
     :produit="pr"
     :supprProduit="supprProduit"
     ></Poubelle>
 </ul>  

</template>


<style scoped>
</style>