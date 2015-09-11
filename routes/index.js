var express = require('express');
var router = express.Router();

//var app =  express();


//app.locals.dsadda = 'My App';


/* GET home page. */
router.get('/', function(req, res, next) {

	console.log(req.app.locals.dsadda);

	//res.send(req.app.locals.dsadda);
  res.render('index', { title: 'Express' });
});

module.exports = router;
