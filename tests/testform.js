
// Example starter JavaScript for disabling form submissions if there are invalid fields




let champsObligatoires = [];
champsObligatoires = [ "lastName", "firstName", "email", "address", "city"];
var champs_pleins = true;


function verif_champs(){
    
    
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


function relanceVerifChamps(){
    champsObligatoires.forEach(champ => {
        document.getElementById(champ).onchange = function() {
            verif_champs();
            //FonctionVerif()= champ+"verif()";
            //FonctionVerif();
        }
    });
} 
relanceVerifChamps();


(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            console.log (form.checkValidity());
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();
  

  //Order Confirmation 
document.getElementById("envoi").onclick = function()  {
    console.log("ok"); 
}
  