var Post = require('../../models/posts');

var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {


if(!req.session.isLoggedin || !req.session.adminId){
    res.redirect("/admin/login");
    return;
}


Post.find({}, function(err, docs){
    data = {};
    data.posts = docs;
    res.render('admin/index', data);
});




});









router.all('/login', function(req, res, next) {


if(req.session.isLoggedin && req.session.adminId){
    res.redirect("/admin");
    return;
}

    data = {};
    
    var Form = require('form');

    var myForm = new Form(req);
    myForm.open({method:"post", action: '/admin/login'});
    myForm.label("Username" ,{for:"username"});
    myForm.text("username", 'vinod',  {class:"form-control"}, [{rule:'isRequired', error: 'This is required.'}]);
    myForm.label("Password","password");
    myForm.password("username", 'vinod',  {class:"form-control"}, [{rule:'isRequired', error: 'This is required.'}]);
    //myForm.pass({name:'password', label: "Password", class:'form-control' , validation:[] });
    myForm.submit({value: "Log in", class:'btn btn-success' });
    myForm.close();
    
    data.form = myForm;
  

  
    data.title = "Login";
    res.render('admin/login', data);


});



router.all('/postd', function(req, res, next) {
 
 //delete post
 if(req.query.id &&  req.query.action && req.query.action == "delete"){
     
    Post.remove({ _id: req.query.id }, function(err) {
        if (!err) {
           return res.redirect("/admin/post");
        } else {
            res.send(500, { error: err });
        }
        
    });

    return;
 }



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

 
 }
 

 
   
   
  if(req.query.id && req.query.action == "edit"){
      
      
        Post.findOne({_id:req.query.id}, function(err, doc){
            
             if (!err){
                 
                data = {};
                data.post = doc;
                res.render('admin/post/edit', data);
                 
             } else{
                 return res.send("404");
             }
       
        });
    

  } 
   


Post.find({}, function(err, docs){
    data = {};
    data.posts = docs;
    res.render('admin/post/list', data);
});
    
});



//add new post

router.all('/possss/add', function(req, res, next) {

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
    
    
   // return res.send(postData);
    
    postData.save(function (err) {
        
        // return res.send("I am here");
        
        if (!err){
            return res.redirect("/admin/post");
        } else{
            return res.send("some error occured");
        }
    });
     
    // return res.send("I am out");
     // return res.redirect("/admin/post");
      
     
 } else{
      res.render('admin/post/add', data);
 }
 





  
  
  
});







module.exports = router;
