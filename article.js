/**
 * recuperation de l'id dans la chaine de l'url et affichage du detail de l'article
 */

const queryString_url_id = window.location.search;
//console.log(queryString_url_id)
// extraction de l'id avec slice 
const ArticleId = queryString_url_id.slice(1);
 
loadConfig().then(data => {
    config = data;
    //fetch(config.host + "/api/teddies/"+ ArticleId)
    fetch(config.host + "/api/"+config.articles+"/"+ ArticleId)
    .then(response => response.json())
    .then(response => {
        let article = new Article(response);
        ArticlePage(article);
    })
    .catch(error => alert("Erreur : " + error));
});
 
function ArticlePage (article){
    //options="article."+config.options;
    options=config.options;
    let listeOptions="";
    let objets=[];
    // a debugger !!!!
    //for (let option of article.config.options) {  
    console.log("article.colors=",article.colors);
    //console.log(typeof(article.colors));
    console.log ("config.options=" ,config.options);
    //console.log("article.?", article.config.options);

    objets=article[0]; 

    console.log(objets);

    for (let option of article.colors) {    
    //for (let option of ${article.${config.options}}) {

         listeOptions += `<OPTION value="${option}"> ${option}</OPTION>`
     }
     document.querySelector(".container").innerHTML += `<div class="col-12 mt-5">
     <div class="card article">
         
        <div class="row">
         
            <img src="${article.imageUrl}" class="card-img-left col-6">
    
            <div class="card-body col-6">
                <div class="card-header">
                <h5 class="card-title d-flex justify-content-between">${article.name}</h5>
                </div>
                <div class="card-text">
                    Description:<br>${article.description}
                    <br>Options: <FORM><SELECT name="optionArticle" id="optionArticle" size="1">
                    ${listeOptions}
                    </SELECT></FORM>
            
                    Prix ${article.price /100 +0.00} € 
                </div>
            
             <span >
                 <button name="btnAjouterAuPanier" type="submit" id="btnAjouterAuPanier" class="btn btn-success col-6">Ajouter au Panier</button>
             </span>
                <div>
                </div>
            </div>
         

             <span>
             </div>
             
             <div>
        </div>
     </div>`; 

 
     //selection du bouton Ajouter l'article dans le panier
     const AjouterAuPanier = document.querySelector("#btnAjouterAuPanier")
     AjouterAuPanier.addEventListener("click", (event)=>{
         event.preventDefault();
         //recuperation de l'option du formulaire
         const option = document.querySelector("#optionArticle");
         console.log(option);
         //recuperation des valeurs du formulaire
         let optionsArticle={
             ImageArticle:article.imageUrl,
             nomArticle:article.name,
             prixArticle:article.price,
             productId:article._id,
             optionArticle:option.value,
             qtyArticle:1,
         }
 
         const demandeConfirmation=()=> {
             if(window.confirm(`${article.name} option:${option.value} a bien été ajouté, Consulter le Panier OK ou revenir a la liste des produits ANNULER`)) 
             {
                 window.location.href="basket.html";
             }else{
                 window.location.href="index.html";
             }
         }
 
         //-------------------------------- local storage  ----------------------------------
         const AjoutNewArticleDansPanier =() => {
             productsAlreadyInLocalStorage.push(optionsArticle);
             localStorage.setItem("Articles", JSON.stringify(productsAlreadyInLocalStorage));
         }
 
         done=false; 
         let productsAlreadyInLocalStorage = JSON.parse(localStorage.getItem("Articles"));
             // if basket not empty
             if (productsAlreadyInLocalStorage){
                 //lecture du panier pour trouver les id et les options correspondantes
                 // si id et option déja présents, on ajoute 1 a la qty, pas de push,et sauvegarde du local storage
                 
                 productsAlreadyInLocalStorage.forEach(function(product){
                     if (( article._id === product.productId ) && (option.value === product.optionArticle)) {
                         //product.qtyArticle = parseInt(product.qtyArticle) + parseInt(articleQuantity.value);
                         product.qtyArticle = parseInt(product.qtyArticle) + 1 ;
                         done= true;    
                     }else{
                        // done=false;
                     }
                 });
 
                 if (done){
                     localStorage.setItem("Articles", JSON.stringify(productsAlreadyInLocalStorage));
                 }else{
                     AjoutNewArticleDansPanier()   ;
                     demandeConfirmation();
                 }
 
             } else {
                 //if basket empty:
                 productsAlreadyInLocalStorage =[]; 
                 AjoutNewArticleDansPanier()   ;
                 demandeConfirmation();
             }
         })
 }
 
 
 
 
 
 
 