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
});

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
            <span>
            <input type="button" id="teddyMinus" value="-" class="btn btn-outline-danger">
            <input type="number" step="1" min="1" name="teddyQuantity" value="1" id="teddyQuantity">
            <input type="button" id="teddyPlus" value="+" class="btn btn-outline-success"></span>
            <span >
                <button name="btnAjouterAuPanier" type="submit" id="btnAjouterAuPanier" class="btn btn-success col-6">Ajouter au Panier</button>
            </span>
        </div>
    </div>`; 
        
    $("#teddyMinus").click(function() {
        if (parseInt($("#teddyQuantity").val()) != 0) {
        let result = parseInt($("#teddyQuantity").val()) - 1;
        $("#teddyQuantity").val(result);
        }
    })

    $("#teddyPlus").click(function(event) {
        var maxLength = parseInt($("#teddyQuantity").attr("max"));
        console.log(maxLength);

        let result = parseInt($("#teddyQuantity").val()) + 1;
        if (result > maxLength) {
        alert("Max Teddy limit is: "+maxLength);
        event.preventDefault();
        return false;
        } else {
        $("#teddyQuantity").val(result);
        }
    })

    //selection du bouton Ajouter l'article dans le panier
    const AjouterAuPanier = document.querySelector("#btnAjouterAuPanier")
    AjouterAuPanier.addEventListener("click", (event)=>{
        event.preventDefault();
        //recuperation de la couleur du formulaire
        const couleur = document.querySelector("#couleurTeddy");
        //recuperation des valeurs du formulaire
        let optionsTeddy={
            ImageTeddy:article.imageUrl,
            nomTeddy:article.name,
            prixTeddy:article.price,
            productId:article._id,
            couleurTeddy:couleur.value,
            qtyTeddy:teddyQuantity.value,
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
        

        const AjoutNewTeddyDansPanier =() => {
            productsAlreadyInLocalStorage.push(optionsTeddy);
            localStorage.setItem("teddy", JSON.stringify(productsAlreadyInLocalStorage));
        }


        done=false;
        let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("teddy"));
            // if basket not empty
            if (productsAlreadyInLocalStorage){
                //lecture du panier pour trouver les id et couleurs correspondantes
                // si id et couleur déja présents, on ajoute 1 a la qty, pas de push,et sauvegarde du local storage
                
                productsAlreadyInLocalStorage.forEach(function(product){
                    if (( article._id === product.productId ) && (couleur.value === product.couleurTeddy)) {
                        product.qtyTeddy = parseInt(product.qtyTeddy) + parseInt(teddyQuantity.value);
                        done= true;    
                    }else{
                       // done=false;
                    }
                });

                if (done){
                    localStorage.setItem("teddy", JSON.stringify(productsAlreadyInLocalStorage));
                }else{
                    AjoutNewTeddyDansPanier();    
                }

            } else {
                //if basket empty:
                productsAlreadyInLocalStorage =[]; 
                AjoutNewTeddyDansPanier();
                //demandeConfirmation();
            }
        })
}






