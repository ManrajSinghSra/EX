const CACHE_DURATION = 3600000; // 1 hour in milliseconds
const PAGE_SIZE = 30;
let currentPage = 1;

function createBlogPostElement(article) {
    const blogPost = document.createElement('article');
    blogPost.className = 'blog-post';

    blogPost.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${article.title}">
        <div class="blog-post-content">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <p class="post-meta">By ${article.author || 'Unknown'} on ${new Date(article.publishedAt).toLocaleDateString()}</p>
            <a href="${article.url}" class="read-more" target="_blank" rel="noopener noreferrer">Read More</a>
        </div>
    `;

    return blogPost;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadBlogPosts() {
    const cachedData = localStorage.getItem('blogData');
    const cachedTimestamp = localStorage.getItem('blogDataTimestamp');

    if (cachedData && cachedTimestamp && (Date.now() - parseInt(cachedTimestamp) < CACHE_DURATION)) {
        displayBlogPosts(JSON.parse(cachedData));
    } else {
        fetchNewBlogPosts();
    }
}

function fetchNewBlogPosts() {
    const apiKey = '49ab287fd5b347b6a6680349acdb2074';
    const apiUrl = `https://newsapi.org/v2/everything?q=pollution&pageSize=${PAGE_SIZE}&page=${currentPage}&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const articles = shuffleArray(data.articles);
            localStorage.setItem('blogData', JSON.stringify(articles));
            localStorage.setItem('blogDataTimestamp', Date.now().toString());
            displayBlogPosts(articles);
        })
        .catch(error => console.error('Error fetching news:', error));
}

function displayBlogPosts(articles) {
    const blogGrid = document.querySelector('.blog-grid');
    blogGrid.innerHTML = ''; // Clear existing posts
    
    articles.forEach(article => {
        const blogPost = createBlogPostElement(article);
        blogGrid.appendChild(blogPost);
    });
}

function filterBlogPosts(searchTerm) {
    const blogPosts = document.querySelectorAll('.blog-post');

    blogPosts.forEach(post => {
        const title = post.querySelector('h2').textContent.toLowerCase();
        const description = post.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase())) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

function loadMorePosts() {
    currentPage++;
    fetchNewBlogPosts();
}

document.addEventListener('DOMContentLoaded', () => {
    loadBlogPosts();

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterBlogPosts(e.target.value);
        });
    }

    const loadMoreButton = document.getElementById('load-more');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', loadMorePosts);
    }
});