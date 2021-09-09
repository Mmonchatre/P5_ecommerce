/*
    test=document.getElementById("test")
    number=1250
    var last2= number.toString().substr(-2);
    var interger = number.toString()substring(0,number.toString().length -2);

    test.innerHTML = interger+"."+last2;
*/

function prixDecimal (prix){
    console.log(prix);
    var last2= prix.toString().substr(-2);
    var entier=prix.toString().substring(0,prix.toString().length -2);
    return (entier+"."+last2)
    //console.log(entier);
}

