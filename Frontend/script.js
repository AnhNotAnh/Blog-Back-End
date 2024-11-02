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

document.addEventListener('DOMContentLoaded', () => {
    // Select button and input field
    const postButton = document.getElementById('postBlog');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const dataContainer = document.getElementById('data-container');

    // When post button is clicked
    postButton.addEventListener('click', async () => {
        const contentValue = contentInput.value;
        const titleValue = titleInput.value;

        if (contentValue.trim() !== '' && titleValue.trim() !== '') {
            //Create a body for post request
            const postData = {
                title: titleValue,
                content: contentValue
            };

            try {
                const response = await fetch('http://localhost:5000/api/posts', {
                    method : 'POST',
                    headers :{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                });

                // Check if request was successful
                if (!response.ok) throw new Error('Failed to create a new post.');

                // Parse the JSON response
                const newPost = await response.json();

                // Create a div for the blog post
                const blogPost = document.createElement('div');
                blogPost.className = 'blog-post';
        
                // Create the title element
                const postTitle = document.createElement('h2');
                postTitle.textContent = newPost.title;
        
                // Create the content element
                const postContent = document.createElement('p');
                postContent.textContent = newPost.content;
        
                // Append title and content to the blog post div
                blogPost.appendChild(postTitle);
                blogPost.appendChild(postContent);
                dataContainer.appendChild(blogPost);

                // Clear the input fields
                contentInput.value = '';
                titleInput.value = '';
            }
            catch (error) {
                console.error('Error:', error)
            }
            
        } else {
            alert('Please enter some content or title before posting!');
        }
    });
});

