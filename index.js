const express = require("express");
const path = require("path");
const postsData = require("./data")
const methodOverride = require("method-override");
const { v4: uuidv4 } = require('uuid');//give unique id

posts = postsData.posts;
const app = express();
app.use(methodOverride("_method"))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/css')));

const port = 3000;
app.listen(port, () => {
    console.log(port);
});

app.get("/posts", (req, res) => {
    res.render("posts", { posts });
});

app.get("/posts/add", (req, res) => {
    res.render("addpost");
});

app.post("/posts", (req, res) => {
    const { title, content, author } = req.body;
    const id = uuidv4();
    const newData = { id, title, content, author }
    posts.push(newData);
    res.redirect("posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    const post = posts.find(p => p.id === id);
    res.render("details", { post });
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    const post = posts.find(p => p.id === id);
    res.render("edit", { post });
});

app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;

    // Find the index of the post to update
    const postIndex = posts.findIndex(p => p.id == id);

    // Update the post
    posts[postIndex] = { id, title, content, author };

    // Redirect to the updated post details page
    res.redirect(`/posts/${id}`);
});

app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect("/posts")
});



