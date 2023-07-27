const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here


router.get('/blog',(req,res)=>{
    let filter = {};
    const search = req.query.search;
    let page = Number(req.query.page) || 1;
    let limit = 5;
    let skip = (parseInt(page)-1)*limit
    // let data = req.body
    
    if(search){
        filter = {
            topic: {$regex: search, $options: 'i'}
        }
    }
    const blogs = Blog.find(filter);

    blogs.skip(skip).limit(limit).then(blogData => {
        res.status(200).json({
            message: "Blogs fetched successfully!",
            data: blogData
        });
    //  if(data){
    //     res.status(201).json({sratus:"success",message:"Blogs fetched successfully!",data:data })
    //  }


    }).catch(err => {
        res.status(500).json({
            errorDesc: "Failed to get blogs!",
            error: err
        });
    })
})

router.post("/blog",(req,res)=>{
    let data = new Blog(req.body);
    data.save().then(record=>{
   
        res.status(201).json({
            status : "success",
            result : record
        })
    }).catch(err=>{
        res.status(500).json({
            status : "error",
            result : err
        })
    })
})

router.put("/blog/:_id",(req,res)=>{
    Blog.updateOne(req.params,{
        $set : req.body,
    }).then((record)=>{
        res.status(200).json({
            status : "success",
            result : record
        })
    }).catch((err)=>{
        res.status(500).json({
            status : "failed to update",
            result : err
        })
    })
})

router.delete('/blog/:_id',(req,res)=>{
    Blog.deleteOne(req.params).then((response)=>{
        res.status(200).json({
            status : "success",
            result : response
        })
    }).catch((err)=>{
        res.status(500).json({
            status: "Failure",
            result: err
        })
    })
})
module.exports = router;