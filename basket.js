function basketDisplay() {
    //recup du LocalStorage (productsAlreadyInLocalStorage);
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

        let PrixTotal = 0 ;

        productsAlreadyInLocalStorage.forEach(function(product){

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
                    <span>
                    <input type="button" value="-" class="minusTeddy">
                    <input type="number" step="1" min="1" name="quantity" value="${product.qtyTeddy}" title="Qty" class="teddyQuantity">
                    <input type="button" value="+" class="plusTeddy">
                    </span>
                    <span class="col align-middle">
                        ${product.prixTeddy/100*product.qtyTeddy}
                    </span>
                    <span class="col align-middle text-right">
                        <button class="btn btn-supprimer-article"><i class="far fa-trash-alt red"></i></button>
                    </span>
                </div>
            `;
            PrixTotal += product.prixTeddy*product.qtyTeddy
        });
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
    }
    /* ---------------- option affichage bouton de/et vidage du panier ------------------------
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



// --- suppression d'un article du panier :
function deleteArticle () {
    let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("teddy"));
    //recuperation du numero du bouton selectionné.
    let btns_supprimer = document.querySelectorAll(".btn-supprimer-article");
    //recuperation du numero du bouton pour suppression de l'element correspndant dans le tableau :
    for (let w=0; w < btns_supprimer.length; w++) {
        btns_supprimer[w].addEventListener("click",(e) =>{
            e.preventDefault();
            if(window.confirm("vous allez supprimer un produit OK pour confirmer")){
                teddyRemoved = productsAlreadyInLocalStorage.splice(w, 1);
                localStorage.setItem("teddy", JSON.stringify(productsAlreadyInLocalStorage));
                refreshBasket();
            }
        })
    }
}
// --- fin fonction suppression d'un article du panier !...

function addTeddyQuantity () {
    let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("teddy"));
    //recuperation du numero du bouton selectionné.
    let btns_plusTeddy = document.querySelectorAll(".plusTeddy");
    //recuperation du numero du bouton pour ajout de 1 element correspondant dans le tableau :
    for (let q=0; q < btns_plusTeddy.length; q++) {
        btns_plusTeddy[q].addEventListener("click",(e) =>{
            e.preventDefault();
            productsAlreadyInLocalStorage[q].qtyTeddy = parseInt(productsAlreadyInLocalStorage[q].qtyTeddy)+ 1;
            localStorage.setItem("teddy", JSON.stringify(productsAlreadyInLocalStorage));
            refreshBasket();
        })
    }
}

function delTeddyQuantity () {
    let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("teddy"));
    //recuperation du numero du bouton selectionné.
    let btns_minusTeddy = document.querySelectorAll(".minusTeddy");
    //recuperation du numero du bouton pour ajout de 1 element correspondant dans le tableau :
    for (let q=0; q < btns_minusTeddy.length; q++) {
        btns_minusTeddy[q].addEventListener("click",(e) =>{
            e.preventDefault();
            if (productsAlreadyInLocalStorage[q].qtyTeddy > 0) {
                productsAlreadyInLocalStorage[q].qtyTeddy = parseInt(productsAlreadyInLocalStorage[q].qtyTeddy)- 1;
                localStorage.setItem("teddy", JSON.stringify(productsAlreadyInLocalStorage));
                refreshBasket()
            }
            })
        }
}

basketDisplay();
addTeddyQuantity();
delTeddyQuantity();
deleteArticle();


function refreshBasket () {
    const myNode = document.getElementById("Container_BasketContents");
    myNode.textContent = '';
    basketDisplay();
    addTeddyQuantity();
    delTeddyQuantity();
    deleteArticle();
}

/* 
confirmation en HTML  et JS :
        <div class="alert alert-info alert-dismissible fade show mt-3" role="alert">
            <h5 class="alert-heading">Suppression d'un article</h5>
            <p>vous allez supprimer un article <a href="#" class="alert-link">Continuer</a> !</p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
*/

