import express from "express";
import bodyParser from "body-parser";

const app=express();

let posts=[];
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res) =>{
    res.render("home",{posts: posts})
})

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});
app.get("/compose", (req, res) => {
  res.render("compose");
});
app.get("/post",(req,res) =>{
    const post={
        title:req.body.postTitle,
        content: req.body.postBody,
    };
    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:postTitle", (req, res) => {
  const requestedTitle = req.params.postTitle.toLowerCase();

  const foundPost = posts.find(
    (post) => post.title.toLowerCase() === requestedTitle
  );

  if (foundPost) {
    res.render("post", { title: foundPost.title, content: foundPost.content });
  } else {
    res.send("Post not found");
  }
});
app.listen(3000,() =>{
    console.log("Server is running on port 3000");
});