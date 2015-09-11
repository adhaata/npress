var Post = require('../../models/posts');

var express = require('express');
var router = express.Router();



/* Post index */
router.get('/', function(req, res, next) {

Post.find({type: 'post'}, function(err, docs){
    data = {};
    data.posts = docs;
    res.render('admin/post/list', data);
});


});


/* Add new post  */
router.all('/add', function(req, res, next) {

data = {};


data.title = "add new";


 if(req.body && req.body.hasOwnProperty("title")){
    
    
    var postData =  new Post({
        'title': req.body.title,
        'slug': req.body.title,
        'description':  req.body.description,
        'author': 1,
        'type': 'post',
        'visibility': req.body.visibility,
        'status': req.body.status,
        'modifiedAt': Date.now(),
        'createdAt': Date.now(),
    });
    
    
    postData.save(function (err) {
        

        if (!err){
            return res.redirect("/admin/post");
        } else{
            return res.send("some error occured");
        }
    });
     

      
     
 } else{
      res.render('admin/post/add', data);
 }
 





  
  
  
});






router.all('/edit/:id', function(req, res, next) {

        
        if(req.body && req.body.hasOwnProperty("title")){



    var postData =  new Post({
        'title': req.body.title,
        'slug': req.body.title,
        'description':  req.body.description,
        'author': 1,
        'type': 'post',
        'visibility': req.body.visibility,
        'status': req.body.status,
        'modifiedAt': Date.now(),
        'createdAt': Date.now()
    });
    
    var postData = postData.toObject();
    delete postData._id;
    
    
   Post.update({_id: req.body.post_id}, {$set: postData}   , {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.redirect("/admin/post");
    });





        } else{


        Post.findOne({_id:req.params.id}, function(err, doc){
            
             if (!err){
                 
                data = {};
                data.post = doc;
                res.render('admin/post/edit', data);
                 
             } else{
                 return res.send("404");
             }
       
        });

        }
});





 //delete post
router.get('/delete/:id', function(req, res, next) {

        
    Post.remove({ _id: req.params.id }, function(err) {
        if (!err) {
            return res.redirect("/admin/post");
        } else {
            res.send(500, { error: err });
        }
    });

    return;

});




module.exports = router;
