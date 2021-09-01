function getLastNameValidation() {
    return document.getElementById("lastName-validation");
  }
  
function getFirstNameValidation() {
    return document.getElementById("firstName-validation");
  }
  
  function disableSubmit(disabled) {
    if (disabled) {
      document
        .getElementById("submit-btn")
        .setAttribute("disabled", true);
    } else {
      document
        .getElementById("submit-btn")
        .removeAttribute("disabled");
    }
  }
  
  document
    .getElementById("lastName")
    .addEventListener("input", function(e) {
    if (/^[a-zA-Z|\s-]*$/.test(e.target.value)) {
        getLastNameValidation().innerText = "Nom valide";
      disableSubmit(false);
    } else {
        getLastNameValidation().innerText = "Nom invalide";
      disableSubmit(true);
    }
  });

  document
  .getElementById("firstName")
  .addEventListener("input", function(e) {
  if (/^[a-zA-Z|\s-]*$/.test(e.target.value)) {
    getFirstNameValidation().innerText = "Prenom valide";
    disableSubmit(false);
  } else {
    getFirstNameValidation().innerText = "Prenom invalide";
    disableSubmit(true);
  }
});