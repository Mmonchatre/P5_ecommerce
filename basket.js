function basketDisplay() {
    
    //recupLocalStorage (productsAlreadyInLocalStorage);
    let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("teddy"));

    let BasketStructure ="";

    const basketContents = document.querySelector("#Container_BasketContents");
    basketContents.innerHTML +=BasketStructure;

    if((productsAlreadyInLocalStorage === null ) || (productsAlreadyInLocalStorage.length == 0)){
        basketContents.innerHTML +=`<div class="text-center">votre panier est vide</div>`;
    }else{
        //affichage du contenu des articles du local storage et calcul du prix total du panier :
        let BasketStructure =`<div class="row">
        <span class="col-2"></span>
        <span class="col">Produit</span>
        <span class="col">Couleur</span>
        <span class="col">Prix</span>
        <span class="col">Qty</span>
        <span class="col">Prix sous total</span>
        <span class="col"></span>
        </div>
        
        `;
        //basketContents.innerHTML +=BasketStructure;
        let PrixTotal = 0 ;

        productsAlreadyInLocalStorage.forEach(function(product){
            //console.log (k);  // verif nombre element du panier 
            BasketStructure += `
                <div class="row border">
                    <img src="${product.ImageTeddy}" alt="Bootstrap" class="img-circle img-thumbnail col-2 align-middle ">
                  
                    <span class="col align-middle">
                        ${product.nomTeddy}
                    </span>
                    <span class="col align-middle">
                        ${product.couleurTeddy}
                    </span>
                    <span class="col align-middle">
                        ${product.prixTeddy/100} € 
                    </span>
                    <!-- <span class="col align-middle"> -->
                    <span class="quantity clearfix">

                    <input type="button" value="-" class="minus minus-js"><input type="number" step="1" min="1" name="quantity" value="${product.qtyTeddy}" title="Qty" class="qty">
                    <input type="button" value="+" class="plus plus-js">
                    </span>
                    <span class="col align-middle">
                        ${product.prixTeddy/100}
                    </span>
                    
                    <span class="col align-middle text-right">
                        <button class="btn btn-supprimer-article"><i class="far fa-trash-alt red"></i></button>
                    </span>
                    
                    
                </div>
            `;
            PrixTotal += product.prixTeddy;
        });



        /* for (k=0; k < productsAlreadyInLocalStorage.length; k++){
            //console.log (k);  // verif nombre element du panier 
            BasketStructure += `
                <div class="row border">
                    <img src="${productsAlreadyInLocalStorage[k].ImageTeddy}" alt="Bootstrap" class="img-circle img-thumbnail col-2 align-middle ">
                  
                    <span class="col align-middle">
                        ${productsAlreadyInLocalStorage[k].nomTeddy}
                    </span>
                    <span class="col align-middle">
                        ${productsAlreadyInLocalStorage[k].couleurTeddy}
                    </span>
                    <span class="col align-middle">
                        ${productsAlreadyInLocalStorage[k].prixTeddy/100} € 
                    </span>
                    <!-- <span class="col align-middle"> -->
                    <span class="quantity clearfix">

                    <input type="button" value="-" class="minus minus-js"><input type="number" step="1" min="1" name="quantity" value="1" title="Qty" class="qty"><input type="button" value="+" class="plus plus-js">
                    </span>
                    <span class="col align-middle">
                        ${productsAlreadyInLocalStorage[k].prixTeddy/100}
                    </span>
                    <!-- 
                    <span class="col align-middle text-right">
                        <button class="btn btn-supprimer-article"><i class="far fa-trash-alt red"></i></button>
                    </span>
                    -->
                    
                </div>
            `;
            PrixTotal += productsAlreadyInLocalStorage[k].prixTeddy;
        }

        */

        BasketStructure = BasketStructure + `
            <div class="row align-start">
                <div class="col text-center">Prix total du Panier: ${PrixTotal/100} €</div>
            </div>
            <div class="row">
                <button class="btn col-12 btn-success" id="id_btn_commander">Commander</button>
            </div>
        `
        basketContents.innerHTML +=BasketStructure;
        // gestion bouton de passage de la commande 
        const id_btn_commander =document.querySelector("#id_btn_commander");
        id_btn_commander.addEventListener("click",(e)=>{
            e.preventDefault;
            window.location.href="order.html"
        })
        //console.log(PrixTotal/100)
    }
/* ---------------- affichage bouton de/et vidage du panier ------------------------
    const btn_vidage_panier = `
    <button id="IdBtnVidagePanier" class="btn-vidage-panier col-12 btn-warning"> vider le panier</button>
    `;
    basketContents.insertAdjacentHTML("beforeend",btn_vidage_panier);
    const Id_btn_vidage_panier =document.querySelector("#IdBtnVidagePanier");
    Id_btn_vidage_panier.addEventListener("click", (e)=> {
        e.preventDefault;
        localStorage.removeItem("teddy");
        alert("Le panier a été vidé");
        window.location.href="basket.html"
    })
*/    // ---------------- vidage du panier Fin !------------------------
}
// fin fonction basketDisplay !----

// --- fonction suppression d'un article du panier :
function deleteArticle () {
    let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("teddy"));
    //recuperation du numero du bouton selectionné.

    let btn_supprimer = document.querySelectorAll(".btn-supprimer-article");

    //recuperation du numero du bouton pour suppression de l'element correspndant dans le tableau :

    for (let w=0; w < btn_supprimer.length; w++) {
        btn_supprimer[w].addEventListener("click",(e) =>{
            e.preventDefault();
            //console.log(w);
            if(window.confirm("vous allez supprimer un produit OK pour confirmer") )
                {
                    teddyRemoved = productsAlreadyInLocalStorage.splice(w, 1);
                    localStorage.setItem("teddy", JSON.stringify(productsAlreadyInLocalStorage));
                    // alert("le produit a bien été supprimé");
                    // suppression de l'ancien affichage et regénération :
                    const myNode = document.getElementById("Container_BasketContents");
                    myNode.textContent = '';
                    basketDisplay();
                    deleteArticle();

                }
            })
    }
}
// --- fin fonction suppression d'un article du panier !...


basketDisplay();
deleteArticle();




/* confirmation en HTML  et JS :

        <div class="alert alert-info alert-dismissible fade show mt-3" role="alert">
            <h5 class="alert-heading">Suppression d'un article</h5>
            <p>vous allez supprimer un article <a href="#" class="alert-link">Continuer</a> !</p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>

            </button>
        </div>

*/

