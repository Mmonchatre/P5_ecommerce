//extraction de l'ID de la commande avec slice 


//const queryString_orderId = window.location.search;
const queryString_orderIdInfos = window.location.search;

console.log(queryString_orderIdInfos);


var parseQueryString = function() {
    var str = window.location.search;
    var objURL = {};
    str.replace(
        new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
        function( $0, $1, $2, $3 ){
            objURL[ $1 ] = $3;
        }
    );
    return objURL;
};
//Example how to use it: 
var params = parseQueryString();


//orderId = params["orderId"];


const fieldFirstName = document.getElementById("firstName")
fieldFirstName.innerHTML = params["firstName"];

const fieldOrderID = document.getElementById("orderId")
fieldOrderID.innerHTML = params["orderId"];


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
                            ${prixDecimal(productsAlreadyInLocalStorage[k].prixArticle)} € 
                        </div>
                    </div>`;
            PrixTotal += productsAlreadyInLocalStorage[k].prixArticle * productsAlreadyInLocalStorage[k].qtyArticle;
            
        }
        BasketRecapStructure = BasketRecapStructure + `
        
            <div class="row">
                <div class ="col">
                    <div class="text-center">
                        Total de votre commande: <span class="font-weight-bold">${prixDecimal(PrixTotal)} €</span>
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

