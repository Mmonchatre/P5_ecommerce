function end_form(){
    var champ_obligatoire = [ "lastname", "firstname", "email", "address", "city"];
    var champ_plein = true;

    for (var h=0; h < champ_obligatoire.length; h++)
    {
        valeur = document.getElementById(champ_obligatoire[h]).value;
        if( (valeur.length == 0) || (valeur == "") || (valeur == "NULL") )
        {
        champ_plein = false;
        }
    }   
 
    if (champ_plein)
    {
    document.getElementById("envoi").disabled = false;
    
    }
    else
    {
    document.getElementById("envoi").disabled = true;
    }
}

//end_form();

/**
 * 
 */
document.querySelector('.form input[type="button"]').addEventListener("click",function(){
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



function tableauIds()  {
    let tableau =[];
    let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("teddy"));
    for (k=0; k < productsAlreadyInLocalStorage.length; k++){
        console.log(k);
        tableau.push(productsAlreadyInLocalStorage[k].productId);
    }

    console.log(tableau);
}


tableauIds();

console.log(tableau);




    const order ={
        contact:{
            firstName:firstname.value,
            lastName:lastname.value,
            address:address.value,
            city: city.value,
            email:email.value

        }
        products: tableau;
        console.log (products)
    }

    const init = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      };

      fetch("http://localhost:3000/api/teddies/order", init) 
      /*{
          .then(function(response)) {
              console.log(response)

          }
      } 
      */