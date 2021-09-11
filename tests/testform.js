
// Example starter JavaScript for disabling form submissions if there are invalid fields




let champsObligatoires = [];
champsObligatoires = [ "lastName", "firstName", "email", "address", "city"];
var champs_pleins = true;

const champTest = document.getElementById("champTest");
const champTest2 = document.getElementById("champTest2");

champTest.addEventListener('input', function(e) {
    var value = e.target.value;
    if (value.startsWith('Hello ')) {
        isValid = true;
        champTest.classList.remove("is-invalid");
        champTest.classList.add("is-valid");
    } else {
        isValid = false;
        champTest.classList.remove("is-valid");
        champTest.classList.add("is-invalid");
    }
});

champTest2.addEventListener('input', function(e) {
    var value = e.target.value;
    function isValid(value) {        
        return /^e[a-zA-Z]{3,}$/.test(value);
    };
});

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
        console.log (form.checkValidity());
        form.addEventListener('submit', function(event) {
            console.log (form.checkValidity());
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation(); 
            alert("formulaire non valide");
          }
          form.classList.add('was-validated');
          console.log (form.checkValidity());
          event.preventDefault();
          event.stopPropagation(); 
          alert("formulaire valide");
        }, false);
      });
    }, false);
  })();
  


  //Order Confirmation 
document.getElementById("envoi").onclick = function()  {
    console.log("ok"); 
}
  