
/* TODO
/*   Implement each REST method taking simpliest args, returning json
/*   Cominity -	todo:[C R RA U D] done:[]
/*   User -		todo:[C R RA U D] done:[]
/*   Post -		todo:[C U D] done:[R RA]
/*   Comment -	todo:[C U D] done:[R RA]
---------------------------------------*/

/* DECLARATIONS
---------------------------------------*/
var c              = require('./server/config');
var path           = require('path');
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();
var router         = express.Router();

var routesPosts    = require('./server/routesPosts');
var routesComments = require('./server/routesComments');
var routesUsers    = require('./server/routesUsers');

/* CONFIGURATION
---------------------------------------*/
app.engine('jade', require('jade').__express);
app.set('views', path.join(__dirname, c.cwd));
app.use(express.static(__dirname + '/public'));	// set the static files location /public/img will be /img for users
app.use(morgan('dev'));							// log every request to the console
app.use(bodyParser());							// pull information from html in POST
app.use(methodOverride());						// simulate DELETE and PUT

/* ROUTES
---------------------------------------*/
router.use(function(req, res, next) {
  console.log('RouteLog : %s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/', function(req,res){
	res.render('index.jade', {time: new Date()});
});

router.post('/login',				routesUsers.login);
router.get( '/auth/:mail/:token',	routesUsers.auth);

router.get(   '/:cominity/posts',		routesPosts.readAll);
router.get(   '/:cominity/posts/:id',	routesPosts.readOne);
router.post(  '/:cominity/posts',		routesPosts.create);
// router.put(   '/:cominity/posts/:id',	routesPosts.update);
// router.delete('/:cominity/posts/:id',	routesPosts.delete);

router.get(   '/:cominity/posts/:id/comments',		routesComments.readAll);
router.get(   '/:cominity/posts/:id/comments/:cid',	routesComments.readOne);
router.post(  '/:cominity/posts/:id/comments',		routesComments.create);
// router.put(   '/:cominity/posts/:id/comments/:cid',	routesComments.update);
// router.delete('/:cominity/posts/:id/comments/:cid',	routesComments.delete);

app.use('/', router);

/* LISTEN
---------------------------------------*/
app.listen(c.port);
console.log('Magic happens on port ' + c.port);






/* EXPRESS 3
---------------------------------------*/
// var c = require('./server/config'),
// 	express = require('express'),
// 	http = require('http'),
// 	path = require('path'),
// 	routesPosts = require('./server/routesPosts'),
// 	routesComments = require('./server/routesComments');
// 	routesUsers = require('./server/routesUsers');
	
// var app = express();

// app.configure(function(){
// 	app.set('views', path.join(__dirname, c.cwd));
// 	app.set('view engine', 'jade');
// 	app.use(express.bodyParser());
// 	app.use(express.cookieParser());
// 	app.use(express.session({secret: '1234567890QWERTY'}));
// 	app.use(express.static(path.join(__dirname, 'public')));
// });

// app.get('/', function(req,res){
// 	console.log('[server.js] Get index');
// 	res.render('index.jade', {time: new Date()});
// });

// app.post('/login',				routesUsers.login);
// app.get( '/auth/:mail/:token',	routesUsers.auth);

// app.get( '/:cominity/posts',		routesPosts.getAll);
// app.get( '/:cominity/posts/:id',	routesPosts.getOne);
// app.post('/:cominity/posts',		routesPosts.add);

// app.get( '/:cominity/posts/:id/comments',		routesComments.getAll);
// app.get( '/:cominity/posts/:id/comments/:cid',	routesComments.getOne);
// app.post('/:cominity/posts/:id/comments',		routesComments.add);

// http.createServer(app).listen(3000, function(){
// 	console.log('Express server listening on port 3000');
// });