

let champsObligatoires = [];
champsObligatoires = [ "lastName", "firstName", "email", "address", "city"];
// activation du bouton envoi si champ_obligatoires remplis

function verif_champs(){
    //let champsObligatoires = [];
    //champsObligatoires = [ "lastName", "firstName", "email", "address", "city"];
    //console.log(champ_obligatoire);
    var champs_pleins = true;
    champsObligatoires.forEach(champ => {
        valeur = document.getElementById(champ).value;
        if((valeur == "") || (valeur === null) ){
            champs_pleins = champs_pleins && false;
        }else{
            champs_pleins = true;
        }
    });
    if (champs_pleins){
        document.getElementById("envoi").disabled = false;
    }else{
        document.getElementById("envoi").disabled = true;
    }
}
// fin activation du bouton envoi si champ_obligatoires remplis

verif_champs();

function relanceVerifChamps(){
    champsObligatoires.forEach(champ => {
        document.getElementById(champ).onchange = function() {
            verif_champs();
        }
    });
} 

relanceVerifChamps();





// generation du recapitulatif ( nom, option et prix de chaque element + total ) du panier :

function basketRecap() {
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
            PrixTotal += productsAlreadyInLocalStorage[k].prixArticle * productsAlreadyInLocalStorage[k].qtyArticle
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

basketRecap()


// generation du recapitulatif du panier, fin!


function tableauIds()  {
    let tableau =[];
    let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("Articles"));
    for (k=0; k < productsAlreadyInLocalStorage.length; k++){
        //console.log(k);
        tableau.push(productsAlreadyInLocalStorage[k].productId);
    }
    //console.log(tableau);
    products=tableau;    
    //console.log(products);
}

tableauIds();


document.getElementById("envoi").onclick = function() {
    const order ={
        contact:{
            firstName:firstName.value,
            lastName:lastName.value,
            address:address.value,
            city: city.value,
            email:email.value
        },
        products
    //        console.log (products)
        }
        console.log(order);

        const init = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        };



   //fetch("http://localhost:3000/api/teddies/order", init) 
   fetch("http://localhost:3000/api/teddies/order", init) 
    .then(res => res.text())
    .then(res => {

        console.log(res);
        //console.log(res.orderId)
    })
    .catch(err => console.error(err));

}





/*

document.querySelector("#envoi").addEventListener("click",function(){
    var valid = true;
    for(let input of document.querySelectorAll(".form input,.form textarea")){

        // console.log(input);

        valid &= input.reportValidity();
        if(!valid){
            break;
        }
    }
    if(valid){
        //end_form();
    // recuperation des valeurs a envoyer en POST.
    let contact={
        /*
            *   firstName: string,
            *   lastName: string,
            *   address: string,
            *   city: string,
            *   email: string
  

        firstName:firstName.value,
        lastName:lastName.value,
        address:address.value,
        city: city.value,
        email:email.value
    }
        alert("Votre commande a bien été enregistrée.");
    }

});


*/