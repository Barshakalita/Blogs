const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id: uuidv4(),
        username: "Rony",
        content: "Coding is an essential skill in today's technology-driven world. It opens up numerous opportunities in various fields such as web development, data science, artificial intelligence, and more."
    },
    {
        id: uuidv4(),
        username: "Shradha",
        content: "Hardwork is important to achieve success. Success is not an overnight phenomenon. It requires dedication, perseverance, and continuous effort to overcome challenges and achieve your goals."
    },
    {
        id: uuidv4(),
        username: "Rishma",
        content: "I got selected for my 1st internship. Internships provide valuable hands-on experience in your field of study and help you build a professional network, which is crucial for future career growth."
    }
];


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newcontent;
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((P)=>id===P.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log("listening on port 8080");
});