//recuperation de plusieurs parametres : https://stackoverflow.com/questions/523266/how-can-i-get-a-specific-parameter-from-location-search/42316411#42316411


const params = location.search.slice(1).split('&').reduce((acc, s) => {
    const [k, v] = s.split('=')
    return Object.assign(acc, {[k]: v})
  }, {})

//envoi du prénom et de l'orderId dans la page ( le nom pourrait aussi être envoyé...)
const fieldFirstName = document.getElementById("firstName")
fieldFirstName.innerHTML = params.firstName;
const fieldOrderID = document.getElementById("orderId")
fieldOrderID.innerHTML = params.orderId;



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

