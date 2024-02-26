<template>
<form id="drive" @submit.prevent="ajoutProduit(nom,qte,photo)">
<input type="text" v-model="nom" placeholder="Que voulez-vous ?" required/>
<input type="number" v-model="qte" min="1" max="100" required/>
<input type="text" v-model="photo" placeholder="URL photo ?" />
<button type="submit">Ajoutez au frigo</button>
</form>
<br><br>
<ul v-for="produit in listeAjouts"
        :key="produit.id">
    <li > {{produit.qte}}  {{ produit.nom }} a/ont été ajouté </li>
</ul>

</template>
    
    <script setup>
    
    import { onMounted, reactive } from 'vue'
    import Produit from "../Produit"
    const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/16/produits";
    const listeFrigo = reactive([]); //reactive : données surveillée, réagit aux modifs, actualise,
    const listeAjouts = reactive([]);
    let nom = ""
    let photo= ""
    let qte=1
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
            listeAjouts.push(new Produit("",n,q,p));
            getProduit() // récup des données de la BDD (dont le new "produit" ajouté)
           })
        .catch((error) => console.log(error));

}
    
    onMounted(()=>{ 
        getProduit()
    })
    </script>



<style scoped>

form {
  display: flex;
  align-items: center;
}

ul{
    background-color: #1867C0;
    color: white;
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