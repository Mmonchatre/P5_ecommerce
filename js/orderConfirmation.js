//extraction de l'ID de la commande avec slice 


const queryString_orderId = window.location.search;
const orderId = queryString_orderId.slice(1);

/*  test de recuperation du nom et prenom pour afficher un message personnalisé
function processData()
  {
    var parameters = location.search.substring(1).split("&");

    var temp = parameters[0].split("=");
    l = unescape(temp[1]);
    temp = parameters[1].split("=");
    p = unescape(temp[1]);
    document.getElementById("log").innerHTML = l;
    document.getElementById("pass").innerHTML = p;
  }
processData()
*/

const fieldOrderID = document.getElementById("orderId")
fieldOrderID.innerHTML = orderId;


// generation du recapitulatif ( nom, option et prix de chaque element + total ) du panier :
let PrixTotal=0;
function basketRecap(PrixTotal) {
    let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("Articles"));
    let BasketRecapStructure ="";
    const basketRecap = document.querySelector("#ContainerBasketRecap");
    //basketRecap.innerHTML +=BasketRecapStructure;
    if((productsAlreadyInLocalStorage === null ) || (productsAlreadyInLocalStorage.length == 0)){
        basketRecap.innerHTML +=`<div class="text-center">votre panier est vide</div>`;
    }else{
        //affichage du contenu des articles du local storage et calcul du prix total du panier :
        let BasketRecapStructure ="";
        basketRecap.innerHTML +=BasketRecapStructure;
        let PrixTotal = 0 ;
        for (k=0; k < productsAlreadyInLocalStorage.length; k++){
            
            BasketRecapStructure = BasketRecapStructure + `
                    <div class="row">
                    <div class="col">
                        ${productsAlreadyInLocalStorage[k].nomArticle}
                    </div>
                    <div class="col">
                        ${productsAlreadyInLocalStorage[k].optionArticle}
                    </div>
                    <div class="col">
                        ${productsAlreadyInLocalStorage[k].qtyArticle} 
                    </div>
                    <div class="col">
                        ${productsAlreadyInLocalStorage[k].prixArticle/100} € 
                    </div>
                    </div>
                    
                
            `;
            PrixTotal += productsAlreadyInLocalStorage[k].prixArticle * productsAlreadyInLocalStorage[k].qtyArticle;
            
        }
        BasketRecapStructure = BasketRecapStructure + `
        
            <div class="row">
                <div class ="col">
                    <div class="text-center">
                        Total de votre commande: <span class="font-weight-bold">${PrixTotal/100} €</span>
                    </div>
                </div>
            </div>            
        `;
        basketRecap.innerHTML +=BasketRecapStructure;
        // gestion bouton de passage de la commande 
    }
}
// fin fonction basketRecap !----

basketRecap();

emptyBasket();
function emptyBasket () {
            localStorage.removeItem("Articles");
        }




// generation du recapitulatif du panier, fin!

