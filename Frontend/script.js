async function fetchBlog() {
    try {
        const response = await fetch('http://localhost:5000/api/posts'); // Replace with your actual endpoint
        const data = await response.json();

        if (Array.isArray(data)) {
            displayData(data);
        } else {
            console.error("Expected an array but received:", data);
        }
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}

function displayData(data) {
    const container = document.getElementById('data-container');
    container.innerHTML = '';

    data.forEach(item => {
        const blogPost = document.createElement('div');
        blogPost.className = 'blog-post';

        const title = document.createElement('h2');
        title.textContent = item.title;

        const content = document.createElement('p');
        content.textContent = item.content;

        blogPost.appendChild(title);
        blogPost.appendChild(content);
        container.appendChild(blogPost);
    });
}

fetchBlog();
