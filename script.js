const API_URL = 'https://newsapi.org/v2/everything?q=BYD&language=en&pageSize=10&apiKey=';
const API_KEY = '';
const container = document.getElementById('news-container');
const yearSpan = document.getElementById('year');

function setYear() {
    const year = new Date().getFullYear();
    yearSpan.textContent = year;
}

async function fetchNews() {
    if (!API_KEY) {
        container.innerHTML = '<p>Please set your News API key in <code>script.js</code>.</p>';
        return;
    }

    try {
        const res = await fetch(API_URL + API_KEY);
        const data = await res.json();
        displayArticles(data.articles);
    } catch (err) {
        container.innerHTML = '<p>Failed to load news.</p>';
        console.error(err);
    }
}

function displayArticles(articles) {
    if (!articles || articles.length === 0) {
        container.innerHTML = '<p>No news found.</p>';
        return;
    }

    container.innerHTML = articles.map(article => {
        return `<div class="article">
            <h2><a href="${article.url}" target="_blank" rel="noopener">${article.title}</a></h2>
            <p>${article.description || ''}</p>
        </div>`;
    }).join('');
}

setYear();
fetchNews();
