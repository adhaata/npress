var Menu = require('../../models/menu');

var express = require('express');
var router = express.Router();



/* Post index */
router.get('/', function(req, res, next) {

Menu.find({}, function(err, docs){
    data = {};
    data.menuItems = docs;
    res.render('admin/menu/list', data);
});


});


/* Add new menu  */
router.post('/add', function(req, res, next) {



var menuData =  new Menu({
        'name': req.body.name,
        'createdAt': Date.now(),
    });
    
    
    menuData.save(function (err, doc) {
        
        if (!err){
            return res.redirect("/admin/menu/edit/"+doc.id);
        } else{
            return res.send("some error occured");
        }
    });



  
  
  
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


        Menu.findOne({_id:req.params.id}, function(err, doc){
            
             if (!err){
                 
                data = {};
                data.post = doc;
                res.render('admin/menu/edit', data);
                 
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
