const apiKey = "eb6284d1d5cd42a2be8953a9a83451f2";
const newsContainer = document.getElementById("news-container");

// Fetch news from News API
async function getNews(category = "general") {
  try {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error("Error fetching News API:", error);
  }
}

// Display API news
function displayNews(articles) {
  newsContainer.innerHTML = ""; // Clear old news
  articles.forEach(article => {
    createNewsCard(article.title, article.description, article.urlToImage, article.url);
  });
}

// Create a reusable news card
function createNewsCard(title, description, image, link) {
  const card = document.createElement("div");
  card.classList.add("news-card");

  card.innerHTML = `
    ${image ? `<img src="${image}" alt="News Image">` : ""}
    <h2>${title}</h2>
    <p>${description || ""}</p>
    <a href="${link}" target="_blank">Read more</a>
  `;

  newsContainer.appendChild(card);
}

// Fetch and display RSS feed news
async function getRSSFeed(rssUrl) {
  try {
    const response = await fetch(rssUrl);
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");

    const items = xml.querySelectorAll("item");
    items.forEach(item => {
      const title = item.querySelector("title")?.textContent;
      const description = item.querySelector("description")?.textContent;
      const link = item.querySelector("link")?.textContent;

      
      createNewsCard(title, description, null, link);
    });
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
  }
}

// Load default news on page load
getNews();
