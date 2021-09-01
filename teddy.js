/**
 * recuperation de l'id dans la chaine de l'url et affichage du detail du teddy 
 */

const queryString_url_id = window.location.search;
//console.log(queryString_url_id)

// extraction de l'id avec slice 
const teddyId = queryString_url_id.slice(1);
//console.log(teddyId)

loadConfig().then(data => {
    config = data;
    fetch(config.host + "/api/teddies/"+ teddyId)
    .then(response => response.json())
    .then(response => {
        let article = new Article(response);
        teddyPage(article);
    })
    .catch(error => alert("Erreur : " + error));
} );

function teddyPage (article){
    let listeOptions="";
    for (let couleur of article.colors) {
        listeOptions += `<OPTION value="${couleur}"> ${couleur}</OPTION>`
	}

    

    document.querySelector(".container").innerHTML += `<div class="col-12 mt-5">
    <div class="card article">
        <div class="card-header">
            <h5 class="card-title d-flex justify-content-between">${article.name}</h5>
        </div>
        <img src="${article.imageUrl}" class="card-img-top">

        <div class="card-body">
            <div class="card-text">
            Options: <FORM><SELECT name="couleurTeddy" id="couleurTeddy" size="1">
            ${listeOptions}
            </SELECT></FORM>
            Description:<br>${article.description}
            </div>
        </div>
        <div>
            <span class="col-6">
                Prix ${article.price /100} € 
            </span>
            <span><input type="button" value="-" class="minus minus-js"><input type="number" step="1" min="1" name="quantity" value="1" id="quantity"><input type="button" value="+" class="plus plus-js"></span>

            <span >
                <button name="btnAjouterAuPanier" type="submit" id="btnAjouterAuPanier" class="btn bg-darkpink col-6">Ajouter au Panier</button>
            </span>
        </div>
    </div>`; 

    //selection du bouton Ajouter l'article dans le panier
    const AjouterAuPanier = document.querySelector("#btnAjouterAuPanier")
    AjouterAuPanier.addEventListener("click", (event)=>{
        event.preventDefault();
        //recuperation de la couleur du formulaire
        const couleur = document.querySelector("#couleurTeddy");
        //recuperation des valeurs du formulaire

        //console.log(article.name, couleur.value, article.price/100)


        let optionsTeddy={
            ImageTeddy:article.imageUrl,
            nomTeddy:article.name,
            prixTeddy:article.price,
            productId:article._id,
            couleurTeddy:couleur.value,
            qtyTeddy:quantity.value,
        }

            //console.log(optionsTeddy)

        const demandeConfirmation=()=> {
            if(window.confirm(`${article.name} option:${couleur.value} a bien été ajouté, Consulter le Panier OK ou revenir a la liste des produits ANNULER`)) 
            {
                window.location.href="basket.html";
            }else{
                window.location.href="index.html";
            }
        }

        //-------------------------------- local storage  ----------------------------------
        let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("teddy"));

        const AjoutNewTeddyDansPanier =() => {

            //lecture du panier pour trouver les id et couleurs correspondantes
            // si id et couleur déja présents, il faut ajouter 1 a la qty, ne pas faire de push, mais changer les valeurs dans le local storage
            // fonction d'ajout d'un teddy dans le panier et sauvegarde dans le local storage

            /*            productsAlreadyInLocalStorage.forEach(function(product){
                if (${product.couleur == couleurTeddy:couleur.value)


                    */



            productsAlreadyInLocalStorage.push(optionsTeddy);
            localStorage.setItem("teddy", JSON.stringify(productsAlreadyInLocalStorage));
        }

            // if basket not empty
            if (productsAlreadyInLocalStorage){
                AjoutNewTeddyDansPanier();
                //console.log(productsAlreadyInLocalStorage)
                demandeConfirmation();
            } 
            //if basket empty:
            else {
                productsAlreadyInLocalStorage =[];
                AjoutNewTeddyDansPanier();
                demandeConfirmation();
            }

            //end event listener
        })
   

}





