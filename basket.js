
//recup du locoal storage //
let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("teddy"));


//console.log(productsAlreadyInLocalStorage)


// affichage des produits //

const basketContents = document.querySelector("#Container_BasketContents");
// console.log(basketContents);

if((productsAlreadyInLocalStorage === null ) || (productsAlreadyInLocalStorage.length == 0)){
    basketContents.innerHTML +=`<div class="container_empty_basket">votre panier est vide</div>`;

}else{
    //affichage du contenu des articles du local storage et calcul du prix total du panier :
    
    let BasketStructure =[];
    let PrixTotal = 0 ;

    for (k=0; k < productsAlreadyInLocalStorage.length; k++){
        //console.log (k);  // verif nombre element du panier 
        BasketStructure = BasketStructure + `
            <div class="row align-items-start border align-middle">
                <div class="col-2 ">
                <img src="${productsAlreadyInLocalStorage[k].ImageTeddy}" alt="Bootstrap" class="img-circle img-thumbnail">
                    
                </div>
                <div class="col-2">
                    ${productsAlreadyInLocalStorage[k].nomTeddy}
                </div>
                <div class="col-2">
                    ${productsAlreadyInLocalStorage[k].couleurTeddy}
                </div>
                <div class="col-2 ">
                    ${productsAlreadyInLocalStorage[k].prixTeddy/100} € 
                </div>
                <div class="col-3 text-right">
                    <button class="btn btn-warning btn-supprimer-article">supprimer cet article</button>
                </div>
            </div>
        `;

        PrixTotal += productsAlreadyInLocalStorage[k].prixTeddy;
    }

    BasketStructure = BasketStructure + `
        <div class="row">
            <div class="col text-center">Prix total du Panier: ${PrixTotal/100} €</div>
        </div>
        <div class="row">
            <button class="btn col-12 btn-success" id="id_btn_commander">Commander</button>
        </div>
    `

    basketContents.innerHTML +=BasketStructure;
    //console.log(PrixTotal/100)
}

// fin affichage du panier ----

// --- suppression d'un article ---

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
                alert("le produit a bien été supprimé");
                window.location.href="basket.html";
            }
        })
}


// ---------------- vidage du panier ------------------------


const btn_vidage_panier = `
<button id="IdBtnVidagePanier" class="btn-vidage-panier col-12 btn-warning"> vider le panier</button>
`;

basketContents.insertAdjacentHTML("beforeend",btn_vidage_panier);

const Id_btn_vidage_panier =document.querySelector("#IdBtnVidagePanier");

// console.log(Id_btn_vidage_panier);

Id_btn_vidage_panier.addEventListener("click", (e)=> {
    e.preventDefault;
    localStorage.removeItem("teddy");
    alert("Le panier a été vidé");
    window.location.href="basket.html"
})

// ---------------- vidage du panier Fin !------------------------


// passagge de la commande 

const id_btn_commander =document.querySelector("#id_btn_commander");

id_btn_commander.addEventListener("click",(e)=>{
    e.preventDefault;
    window.location.href="commande.html"

})
