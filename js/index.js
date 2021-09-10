/**
 * Gère l'affichage de la liste des Articles
 */
loadConfig().then(data => {
    config = data;
    //fetch(config.host + "/api/teddies").then(data => data.json())
    fetch(config.host + "/api/"+config.articles+"").then(data => data.json())
        .then(jsonListArticle => {
            for (let jsonArticle of jsonListArticle) {
                let article = new Article(jsonArticle);
                    document.querySelector("#listeProduits").innerHTML += 
                        `
                        <div class="col-12 col-lg-4 mb-5">
                            <div class="card article">
                                <div class="card-header">
                                    <h5 class="card-title d-flex justify-content-between">${article.name}
                                    </span><a href="./article.html?${article._id}" class="stretched-link" ></a></h5>
                                </div>
                                <img src="${article.imageUrl}" class="card-img-top img-thumbnail img-height">

                                <div class="card-body">
                                    <p class="card-text">
                                        <!--Description:<br>${article.description}-->
                                        <br>Prix ${prixDecimal(article.price)} € 
                                    </p>
                                </div>
                            </div>
                        </div>
                        `;
            }
        });
});



