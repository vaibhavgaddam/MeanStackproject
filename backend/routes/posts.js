const express= require('express');
const multer= require("multer");
const router= express.Router();
const MINE_TYPE_MAP={
  'image/png':'png',
  'image/jpeg':'jpeg',
  'image/jpg':'jpg'
};
const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
    const isValid=MINE_TYPE_MAP[file.mimetype];
    let error= new Error("Invalid mime type");
    if(isValid){
      error=null;
    }
    cb(error,"backend/images");
  },
  filename:( req,file,cb)=>{
    const name=file.originalname.toLowerCase().split(' ').join('-');
    const ext=MINE_TYPE_MAP[file.mimetype];
    cb(null,name+'-'+Date.now()+'-'+ext);
  }
})
const Post=require("../models/post");

router.post("",multer({storage:storage}).single("image"),(req,res,next)=>{
  const url= req.protocol + '://' + req.get("host");
  const post =new Post({
    title:req.body.title,
    content:req.body.content,
    imagePath :url + "/images/" + req.file.filename
  })
  console.log(post);
  post.save().then( createdPost=>{
    res.status(201).json({
      message:"Post added successfully",
      // postId:createdPost._id
      post:{
        ...createdPost,
        id:createdPost._id,

      }
  });
  });
})
router.put("/:id",
multer({storage:storage}).single("image"),
(req,res,next)=>{
  let imagePath= req.body.imagePath;
  if(req.file){
    const url= req.protocol + '://' + req.get("host");
    imagePath :url + "/images/" + req.file.filename
  }
  const post=new Post({
    _id:req.body.id,
    title:req.body.title,
    content:req.body.content,
    imagePath:imagePath
  })
  Post.updateOne({ _id:req.params.id},post).then(result  =>{
    console.log(result);
    res.status(200).json({message:"update successfull"});
  });
});

router.get('',(req,res,next)=> {

  Post.find().then(documents =>{
    res.status(200).json({
      message:'post message',
      posts:documents
    });
  });
})
router.get('/:id',(req,res,next)=>{
  Post.findById(req.params.id).then(post =>{
    if(post){
      res.status(200).json(post);
    }
    else{
      res.status(404).json({ message:"Post not found"});
    }
  })
})
router.delete('/:id',(req,res,next)=>{
  console.log(req.params.id);
  Post.deleteOne({_id:req.params.id}).then(result=>{
    res.status(200).json({message:"post deleted"});
  })
  res.status(200).json({ message:"Post deleted!"});
});

module.exports = router
