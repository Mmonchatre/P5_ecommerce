
// activation du bouton envoi si champ_obligatoires remplis

/*
function verif_champs(){
    var champ_obligatoire = [ "lastName", "firstName", "email", "address", "city"];
    //console.log(champ_obligatoire);
    var champs_pleins = true;
    for (var h=0; h < champ_obligatoire.length; h++)
    {
        const champ=document.getElementById(document.getElementById(champ_obligatoire[h]);
        console.log(champ);
        //console.log(h);
        //console.log(champ_obligatoire.length);
        valeur = document.getElementById(champ_obligatoire[h].value);
        //console.log(champ_obligatoire[h]);
        //console.log(valeur);
        if((valeur == "") || (valeur === null) ){
            champs_pleins = champs_pleins && false;
            }else{
                champs_pleins = true;
            }
        console.log("final", champs_pleins);        
    }   
    if (champs_pleins){
        document.getElementById("envoi").disabled = false;
    }else{
        document.getElementById("envoi").disabled = true;
    }
}

*/



document.querySelector(".form-control").addEventListener("click",function(){
    var valid = true;
    for(let input of document.querySelectorAll(".form input,.form textarea")){

        // console.log(input);

        valid &= input.reportValidity();
        if(!valid){
            break;
        }
    }
    if(valid){
        end_form();
    // recuperation des valeurs a envoyer en POST.
    let contact={
        /*
            *   firstName: string,
            *   lastName: string,
            *   address: string,
            *   city: string,
            *   email: string
  
        */
        firstName:firstname.value,
        lastName:lastname.value,
        address:address.value,
        city: city.value,
        email:email.value
    }
        alert("Votre commande a bien été enregistrée.");
    }

});




// generation du recapitulatif ( nom, couleur et prix de chaque element + total ) du panier :

function basketRecap() {
    let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("teddy"));
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
                        ${productsAlreadyInLocalStorage[k].nomTeddy}
                    </td>
                    <td>
                        ${productsAlreadyInLocalStorage[k].couleurTeddy}
                    </td>
                    <td>
                        ${productsAlreadyInLocalStorage[k].qtyTeddy} 
                    </td>
                    <td>
                        ${productsAlreadyInLocalStorage[k].prixTeddy/100} € 
                    </td>
                    </tr>
                
            `;
            PrixTotal += productsAlreadyInLocalStorage[k].prixTeddy * productsAlreadyInLocalStorage[k].qtyTeddy
        }
        BasketRecapStructure = BasketRecapStructure + `
            <div class="row">
                <div class="text-center recap">Total de votre commande: ${PrixTotal/100} €</div>
            </div>
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
    let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("teddy"));
    for (k=0; k < productsAlreadyInLocalStorage.length; k++){
        //console.log(k);
        tableau.push(productsAlreadyInLocalStorage[k].productId);
    }
    //console.log(tableau);
    products=tableau;    
    //console.log(products);
}

tableauIds();


/*
    const order ={
        contact:{
            firstName:firstName.value,
            lastName:lastName.value,
            address:address.value,
            city: city.value,
            email:email.value
        }
        
*/


class Answer {
    constructor(jsonAnswer){
        jsonAnswer && Object.assign(this, jsonAnswer);
    }
  }



const order ={
    contact:{
        firstName:"monchatre",
        lastName:"Michel",
        address:"2 rue de la martiniere",
        city: "Palaiseau",
        email:"michel.monchatre@gmail.com"
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

   fetch("http://localhost:3000/api/teddies/order", init) 
    .then(res => res.text())
    .then(res => {

        console.log(res);
        //console.log(res.orderId)
    })
    .catch(err => console.error(err));


