const API_KEY = "1e3eaa71d3574ad88ee1a372ef3d9d84";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India")); // fetch india news

//Reload method of logo

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);
}
function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = ""; // jitni bar bind data karenge utni hi bar card container ke ander card dalte jayenge.
    
    articles.forEach((article) => {
        if(!article.urlToImage) return; // Agar article ki image nhi hai to don't show.
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`;
    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url, "_blank");
    })
}

// To select item
let currentSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener('click', ()=>{        //Click hone pr kya ho
    const query = searchText.value;
    if(!query) return; //user ne bina kuch likhe search button pr click kr diya hai.
    fetchNews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = null;  
});