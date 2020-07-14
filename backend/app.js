const path = require('path');
const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require("mongoose");
const postsRoutes = require("./routes/posts");
const Post=require('./models/post');
const app=express();
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.qto5y.mongodb.net/node-angular?retryWrites=true&w=majority",{ useNewUrlParser: true ,useUnifiedTopology: true} )
.then(() =>{
  console.log("Connected to database");
})
.catch(()=>{
  console.log("connecition failed");
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:false}));

app.use("/images",express.static(path.join("backend/images")));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-requested-With,Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET,POST,PATCH,OPTIONS,PUT,DELETE");

  next();
});
app.use("/api/posts",postsRoutes);

module.exports = app;
