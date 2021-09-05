//extraction de l'ID de la commande :

const queryString_orderId = window.location.search;
console.log(queryString_orderId)

// extraction de l'id avec slice 
const orderId = queryString_orderId.slice(1);


console.log(orderId);


const fieldOrderID = document.getElementById("orderId")

console.log (fieldOrderID);

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
            //console.log (k);  // verif nombre element du panier 
            BasketRecapStructure = BasketRecapStructure + `
                    <tr>
                    <td>
                        ${productsAlreadyInLocalStorage[k].nomArticle}
                    </td>
                    <td>
                        ${productsAlreadyInLocalStorage[k].optionArticle}
                    </td>
                    <td>
                        ${productsAlreadyInLocalStorage[k].qtyArticle} 
                    </td>
                    <td>
                        ${productsAlreadyInLocalStorage[k].prixArticle/100} € 
                    </td>
                    </tr>
                    
                
            `;
            PrixTotal += productsAlreadyInLocalStorage[k].prixArticle * productsAlreadyInLocalStorage[k].qtyArticle;
            
        }
        BasketRecapStructure = BasketRecapStructure + `
            <tr>
            <td colspan="4" class="text-center text-uppercase">Total de votre commande: <span class="font-weight-bold">${PrixTotal/100} €</span></td>
            </tr>
        `;
        basketRecap.innerHTML +=BasketRecapStructure;
        // gestion bouton de passage de la commande 
    }
}
// fin fonction basketRecap !----

basketRecap();




// generation du recapitulatif du panier, fin!

