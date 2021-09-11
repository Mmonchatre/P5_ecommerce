function prixDecimal (prix){
    var last2= prix.toString().substr(-2);
    var entier=prix.toString().substring(0,prix.toString().length -2);
    return (entier+","+last2)
}

