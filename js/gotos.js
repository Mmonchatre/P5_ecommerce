
 function gotoHome () {
    let gotoHome= document.querySelector("#gotoHome");
    gotoHome.addEventListener("click", (event)=>{
     event.preventDefault();
     window.location.href="index.html";
    })
};

gotoHome();


function gotoBasket () {
    let gotoBasket= document.querySelector("#gotoBasket");
    gotoBasket.addEventListener("click", (event)=>{
     event.preventDefault();
     window.location.href="basket.html";
    })
};

gotoBasket();

