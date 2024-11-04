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
        blogPost.dataset.id = item.id;

        const title = document.createElement('h2');
        title.textContent = item.title;

        const content = document.createElement('p');
        content.textContent = item.content;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editPost(item.id));

        blogPost.appendChild(title);
        blogPost.appendChild(content);
        blogPost.appendChild(editButton);
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
                blogPost.dataset.id = newPost.id;
        
                // Create the title element
                const postTitle = document.createElement('h2');
                postTitle.textContent = newPost.title;
        
                // Create the content element
                const postContent = document.createElement('p');
                postContent.textContent = newPost.content;
                
                // Create an edit button
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.addEventListener("click", () => editPost(newPost.id));
        
                // Append title and content to the blog post div
                blogPost.appendChild(postTitle);
                blogPost.appendChild(postContent);
                blogPost.appendChild(editButton);
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


const editPost = (postId) => {
    //Get a specific post based on given postId
    const postElement = document.querySelector(`div[data-id="${postId}"]`);
    const title = postElement.querySelector("h2").textContent;
    const content = postElement.querySelector("p").textContent;

    // Create input fields with the current title and content values
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = title;

    const contentInput = document.createElement("input");
    contentInput.type = "text";
    contentInput.value = content;

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => saveEdit(postId, titleInput.value, contentInput.value));

    const deleteButton = document.createElement("button");
    deleteButton.className = 'dangerButton';
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deletePost(postId));
    
    postElement.innerHTML = "";
    postElement.appendChild(titleInput);
    postElement.appendChild(contentInput);
    postElement.appendChild(saveButton);
    postElement.appendChild(deleteButton);
};

// Use then() to handle async in this function
const saveEdit = (postId, titleInput, contentInput) => {
    const postData = {title: titleInput, content: contentInput};
    fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(updatedPost => {
        // Update the UI with the new title and content
        const postElement = document.querySelector(`div[data-id="${postId}"]`);
        postElement.innerHTML = ""; // Clear existing content

        // Re-create the updated title and content in the UI
        const title = document.createElement("h2");
        title.textContent = updatedPost.title;
        
        const content = document.createElement("p");
        content.textContent = updatedPost.content;
        
        // Re-add the edit button to the updated post
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editPost(postId));
        
        postElement.appendChild(title);
        postElement.appendChild(content);
        postElement.appendChild(editButton);
    })
    .catch(error => console.error("Error updating post:", error));
};

const deletePost = async (postId) => {
    try{
        const postElement = document.querySelector(`div[data-id="${postId}"]`);
        
        const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json"
            }
        })
        if (!response.ok) throw new Error(`Failed to delete the post with postId: ${postId}`);
        postElement.remove();
    }
    catch(error) {
        console.error("Error delete post: ", error)
    }
};