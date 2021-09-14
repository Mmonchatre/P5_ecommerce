//loadConfig();

function basketDisplay() {
    PrixTotal=0;
    //recup du LocalStorage (productsAlreadyInLocalStorage);
    let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("Articles"));
    let BasketStructure ="";
    const basketContents = document.querySelector("#Container_BasketContents");
    basketContents.innerHTML +=BasketStructure;
    if((productsAlreadyInLocalStorage === null ) || (productsAlreadyInLocalStorage.length == 0)){
        basketContents.innerHTML +=`<div class="text-center">votre panier est vide</div>`;
        document.getElementById('infosContact').style.visibility = 'hidden';
        // les infos de contact ne sont pas affiché si le panier est vide ( css visibility:hidden sur ID infosContact )
    }else{
        document.getElementById('infosContact').style.visibility = 'visible';
        //affichage du contenu des articles du local storage et calcul du prix total du panier :
        let BasketStructure =`<div class="row">
            <span class="col-lg-2"></span>
            <span class="col-6 col-lg-2">Produit</span>
            <span class="col-6 col-lg-1">Option</span>
            <span class="col-3 col-lg-1">Prix</span>
            <span class="col-6 col-lg-3">Quantité</span>
            <span class="col-3 col-lg-2">Prix sous total</span>
            <span class="col"></span>
        </div>`;
        productsAlreadyInLocalStorage.forEach(function(product){
            BasketStructure += `<div class="row border">
                    <img src="${product.ImageArticle}" alt="Bootstrap" class="img-circle img-thumbnail col-12 col-lg-2 align-middle ">
                    <span class="col-6 col-lg-2 align-middle">
                        ${product.nomArticle}
                    </span>
                    <span class="col-6 col-lg-1 align-middle">
                        ${product.optionArticle}
                    </span>
                    <span class="col-3 col-lg-1 align-middle">
                        ${prixDecimal(product.prixArticle)}€
                    </span>
                    <!-- <span class="col align-middle"> -->
                    <span class="col-6 col-lg-3">
                    <input type="button" value="-" class="minusArticle">
                    <input type="number" step="1" min="1" name="quantity" value="${product.qtyArticle}" title="Qty" class="articleQuantity">
                    <input type="button" value="+" class="plusArticle">
                    </span>
                    <span class="col-3 col-lg-2 align-middle">
                        ${prixDecimal(product.prixArticle*product.qtyArticle)}€
                    </span>
                    <span class="col-12 col-lg-1 align-middle">
                        <button class="btn btn-supprimer-article"><i class="far fa-trash-alt red"></i></button>
                    </span>
                </div>`;
            PrixTotal += product.prixArticle*product.qtyArticle
        });
        BasketStructure = BasketStructure + `<div class="row align-start">
                <div class="col text-center">Prix total du Panier: ${prixDecimal(PrixTotal)} €</div>
            </div>`
        basketContents.innerHTML +=BasketStructure;
    }
}
// fin fonction basketDisplay !----

// --- suppression d'un article du panier :
function deleteArticle () {
    let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("Articles"));
    //recuperation du numero du bouton selectionné.
    let btns_supprimer = document.querySelectorAll(".btn-supprimer-article");
    //recuperation du numero du bouton pour suppression de l'element correspndant dans le tableau :
    for (let w=0; w < btns_supprimer.length; w++) {
        btns_supprimer[w].addEventListener("click",(e) =>{
            e.preventDefault();
            if(window.confirm("vous allez supprimer un produit OK pour confirmer")){
                articleRemoved = productsAlreadyInLocalStorage.splice(w, 1);
                localStorage.setItem("Articles", JSON.stringify(productsAlreadyInLocalStorage));
                refreshBasket();
            }
        })
    }
}
// --- fin fonction suppression d'un article du panier !...

function addArticleQuantity () {
    let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("Articles"));
    //recuperation du numero du bouton selectionné.
    let btns_plusArticle = document.querySelectorAll(".plusArticle");
    //recuperation du numero du bouton pour ajout de 1 element correspondant dans le tableau :
    for (let q=0; q < btns_plusArticle.length; q++) {
        btns_plusArticle[q].addEventListener("click",(e) =>{
            e.preventDefault();
            productsAlreadyInLocalStorage[q].qtyArticle = parseInt(productsAlreadyInLocalStorage[q].qtyArticle)+ 1;
            localStorage.setItem("Articles", JSON.stringify(productsAlreadyInLocalStorage));
            refreshBasket();
        })
    }
}

function delArticleQuantity () {
    let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("Articles"));
    //recuperation du numero du bouton selectionné.
    let btns_minusArticle = document.querySelectorAll(".minusArticle");
    //recuperation du numero du bouton pour ajout de 1 element correspondant dans le tableau :
    for (let q=0; q < btns_minusArticle.length; q++) {
        btns_minusArticle[q].addEventListener("click",(e) =>{
            e.preventDefault();
            if (productsAlreadyInLocalStorage[q].qtyArticle >= 1 ) {
                productsAlreadyInLocalStorage[q].qtyArticle = parseInt(productsAlreadyInLocalStorage[q].qtyArticle)- 1;
                localStorage.setItem("Articles", JSON.stringify(productsAlreadyInLocalStorage));
                refreshBasket()
            }else
            {
            // si qty =0, on supprime la ligne du panier.
            articleRemoved = productsAlreadyInLocalStorage.splice(q, 1);
            localStorage.setItem("Articles", JSON.stringify(productsAlreadyInLocalStorage));
            refreshBasket();
            }
            })
        }
}

basketDisplay();
addArticleQuantity();
delArticleQuantity();
deleteArticle();


function refreshBasket () {
    const myNode = document.getElementById("Container_BasketContents");
    myNode.textContent = '';
    basketDisplay();
    addArticleQuantity();
    delArticleQuantity();
    deleteArticle();
}

// verification des contenus des champs pour la commande fetch POST
// activation du bouton envoi si champ_obligatoires remplis

let champsObligatoires = [];
champsObligatoires = [ "lastName", "firstName", "email", "address", "city"];
var champs_pleins = true;



function afficheMessage (message) {
    const Affichemessage = document.querySelector("#messages");
    Affichemessage.innerHTML =message;
}



function verif_champs(){
    afficheMessage("");
    
    var champs_pleins = true;
    champsObligatoires.forEach(champ => {
        valeur = document.getElementById(champ).value;

                if((valeur == " ") || (valeur === null) || (valeur === "") ){
                    champs_pleins = false;
                }else{
                    champs_pleins = champs_pleins && true;
                }
    });
    if (champs_pleins){
        document.getElementById("envoi").disabled = false;
    }else{
        document.getElementById("envoi").disabled = true;
    }
}
verif_champs();
// fin verif_champ()

function relanceVerifChamps(){
    champsObligatoires.forEach(champ => {
        document.getElementById(champ).onchange = function() {
            verif_champs();
        }
    });
} 
relanceVerifChamps();

// fin activation du bouton envoi si champ_obligatoires remplis
//preparation de fetch POST :

function tableauIds()  {
    let tableau =[];
    let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("Articles"));
    for (k=0; k < productsAlreadyInLocalStorage.length; k++){
        tableau.push(productsAlreadyInLocalStorage[k].productId);
    };
    products=tableau;    
}
tableauIds();


function serverOrder () {
    const order ={
        contact:{
            firstName:firstName.value,
            lastName:lastName.value,
            address:address.value,
            city: city.value,
            email:email.value
            },
        products
        }
        const init = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        };
// console.log("JSON.stringify(order)=",JSON.stringify(order));

        loadConfig().then(data => {
            config = data;
            fetch(config.host + "/api/"+config.articles+"/order", init)
            .then(response => response.json())
            .then(response => {
                //console.log("reponse=",response);
                orderId=response.orderId;
                if (orderId != undefined) {
                    const page2open ="orderConfirmation.html?orderId="+orderId+"&lastName="+lastName.value+"&firstName="+firstName.value;
                    window.location=page2open;
                }else{
                    let message="Une erreur est survenue , votre commande n'a pas pu être passée";
                    afficheMessage(message);
                }
            })
            .catch(error => alert("Erreur dans basket.js : " + error));
        });
}



(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');

        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            if (form.checkValidity() === false) {
                }
                form.classList.add('was-validated');
                if (form.checkValidity() === true) {
                    serverOrder(); 
                        }
        form.addEventListener('submit', function(event) {
            //alert(form.checkValidity());
            if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            }
            form.classList.add('was-validated');
            if (form.checkValidity() === true) {
                serverOrder(); 
                event.preventDefault();
                event.stopPropagation();
                }
            
        }, false);
        });
    }, false);

})();


//Order Confirmation 
//document.getElementById("envoi").onclick = function() {}
    

