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
    
    //console.log (config.options);

    options="article."+config.options;
    console.log(options);
     let listeOptions="";
     
     
     // a debugger !!!!
     //for (let option of article.config.options) {  


    for (let option of article.colors) {

         listeOptions += `<OPTION value="${option}"> ${option}</OPTION>`
     }
     document.querySelector(".container").innerHTML += `<div class="col-12 mt-5">
     <div class="card article">
         <div class="card-header">
             <h5 class="card-title d-flex justify-content-between">${article.name}</h5>
         </div>
         <img src="${article.imageUrl}" class="card-img-top">
 
         <div class="card-body">
             <div class="card-text">
             Options: <FORM><SELECT name="optionArticle" id="optionArticle" size="1">
             ${listeOptions}
             </SELECT></FORM>
             Description:<br>${article.description}
             </div>
         </div>
         <div>
             <span class="col-6">
                 Prix ${article.price /100} € 
             </span>
             <span>
             <input type="button" id="articleMinus" value="-" class="btn btn-outline-danger">
             <input type="number" step="1" min="1" name="articleQuantity" value="1" id="articleQuantity">
             <input type="button" id="articlePlus" value="+" class="btn btn-outline-success"></span>
             <span >
                 <button name="btnAjouterAuPanier" type="submit" id="btnAjouterAuPanier" class="btn btn-success col-6">Ajouter au Panier</button>
             </span>
         </div>
     </div>`; 
         
     $("#articleMinus").click(function() {
         if (parseInt($("#articleQuantity").val()) != 0) {
         let result = parseInt($("#articleQuantity").val()) - 1;
         $("#articleQuantity").val(result);
         }
     })
 
     $("#articlePlus").click(function(event) {
         var maxLength = parseInt($("#articleQuantity").attr("max"));
         console.log(maxLength);
 
         let result = parseInt($("#articleQuantity").val()) + 1;
         if (result > maxLength) {
         alert("Max Article limit is: "+maxLength);
         event.preventDefault();
         return false;
         } else {
         $("#articleQuantity").val(result);
         }
     })
 
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
             qtyArticle:articleQuantity.value,
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
                         product.qtyArticle = parseInt(product.qtyArticle) + parseInt(articleQuantity.value);
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
 
 
 
 
 
 
 