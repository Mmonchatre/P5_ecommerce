/**
 * Gère l'affichage de la liste des Teddies 
 */
loadConfig().then(data => {
    config = data;
    fetch(config.host + "/api/teddies").then(data => data.json())
        .then(jsonListArticle => {
            for (let jsonArticle of jsonListArticle) {
                let article = new Article(jsonArticle);
                    document.querySelector(".container").innerHTML += 
                                                                    `
                                                                    <!-- <div class="col-12 mt-5"> -->
                                                                    <div class="col-12 col-lg-4 mt-5">
                                                                        <div class="card article">
                                                                            <div class="card-header">
                                                                                <h5 class="card-title d-flex justify-content-between">${article.name}
                                                                                </span><a href="./teddy.html?${article._id}" class="stretched-link" ></a></h5>
                                                                            </div>
                                                                            <img src="${article.imageUrl}" class="card-img-top img-thumbnail">

                                                                            <div class="card-body">
                                                                                <p class="card-text">
                                                                                    <!--Description:<br>${article.description}-->
                                                                                    <br>Prix ${article.price /100} € 
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    `;
            }
        });
});



