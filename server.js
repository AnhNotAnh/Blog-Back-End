const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

let posts = [
  {
    id: 1,
    title: "Exploring the Basics of HTML",
    content:
      "HTML, or HyperText Markup Language, is the standard language for creating web pages. It describes the structure of a web page and its contents, such as headings, paragraphs, links, images, and other elements. Learning HTML is the first step towards web development, and it provides the foundation for creating web pages and web applications.",
  },
  {
    id: 2,
    title: "Getting Started with CSS",
    content:
      "CSS, or Cascading Style Sheets, is a style sheet language used to describe the presentation of a document written in HTML. CSS controls the layout, colors, fonts, and overall visual appearance of a web page. By using CSS, you can create visually appealing web pages and ensure a consistent look and feel across your site. Understanding CSS is essential for front-end development and helps bring your HTML content to life.",
  },
];

// Get the list of blogs
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// Add a new blog
app.post("/api/posts", (req, res) => {
  const newPost = { id: posts.length + 1, ...req.body };
  posts.push(newPost);
  res.json(newPost);
});

// Edit a blog
app.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const updatedPost = { id: Number(id), ...req.body };
  posts = posts.map((post) => (post.id === Number(id) ? updatedPost : post));
  res.json(updatedPost);
});

// Delete a blog
app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((post) => post.id !== Number(id));
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
