/**
 * Gère l'affichage des produits et les interactions de la page d'accueil
 */
loadConfig().then(data => {
    config = data;
    fetch("localhost:3000/api/teddies").then(data => data.json())
        .then(jsonListArticle => {
            for (let jsonArticle of jsonListArticle) {
                let article = new Article(jsonArticle);
                document.querySelector(".container").innerHTML += `<div class="col-12 mt-5">
                                                                        <div class="card article">
                                                                            <div class="card-header">
                                                                                <h5 class="card-title d-flex justify-content-between">${article.title}<span class="publication-date">${article.getFormatedDate()}</span></h5>
                                                                            </div>
                                                                            <img src="localhost:3000/${article.image}" class="card-img-top">
                                                                            <span class="fa-stack fa-2x addFavorite" data-id=${article._id}>
                                                                                <i class="fas fa-star fa-stack-1x"></i>
                                                                                <i class="far fa-star fa-stack-1x"></i>
                                                                            </span>
                                                                            <div class="card-body">
                                                                                <p class="card-text">${article.description}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    `;
            }

            document.querySelectorAll(".addFavorite").forEach(star => {
                star.addEventListener("click", function() {
                    if (this.className.indexOf("activated") != -1) {
                        this.setAttribute("class", "fa-stack fa-2x addFavorite");
                        removeFavorites(this.dataset.id);
                    } else {
                        this.setAttribute("class", "fa-stack fa-2x addFavorite activated");
                        addFavorites(this.dataset.id);
                    }
                });
            });
        });
});