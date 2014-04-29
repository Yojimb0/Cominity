var h = require('./helpers');

exports.readAll = function(req, res){
	var r;
	
	console.log('[routesComments.js:readAll] post:', req.params.id);

	h.find('comments', {posts: req.params.id}, function(r){
		res.json(r);
	});
};

exports.readOne = function(req, res){
	var r;

	console.log('[routesComments.js:readOne] post:', req.params.id,' comment:', req.params.cid);
	
	h.find('comments', {posts: req.params.id, id: req.params.cid}, function(r){
		res.json(r);
	});
};

exports.create = function(req, res){
	
};

