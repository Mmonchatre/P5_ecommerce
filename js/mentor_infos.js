const inputs = document.querySelectorAll('input[type="text"]');
let firstName, lastName, adress, city, email;

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};
const firstNameChecker = (value) => {
  if (!value.match(/^[a-zA-Z|\s-]*$/)) {
    errorDisplay(
      "firstname",
      "Le prénom ne peux pas contenir de caractères spéciaux ou de chiffres"
    );
    firstName = null;
    document.getElementById("first-name").classList.add("is-invalid");
  } else {
    errorDisplay("firstname", "", true);
    firstName = value;
    document.getElementById("first-name").classList.remove("is-invalid");
  }
};


inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "first-name":
        firstNameChecker(e.target.value);
        break;

// email checker:
// if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {

