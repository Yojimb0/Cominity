var h = require('./helpers');

exports.readAll = function(req, res){
	var r;

	console.log('[routesPosts.js:readAll]');

	h.find('posts', {}, function(r){
		if(r.docs.length === 0){
			res.send(h.errorCode.noContent);
		}else{
			res.json(r);
		}
	});
	
};

exports.readOne = function(req, res){
	var r;

	console.log('[routesPosts.js:readOne] post:', req.params.id);
	
	h.find('posts', {id: req.params.id}, function(r){
		if(r.docs.length === 0){
			res.send(h.errorCode.noContent);
		}else{
			res.json(r);
		}
	});

};

exports.create = function(req, res){
	var r;

	h.find('increments', {_id:'posts'}, function(r){
		if(r.docs.length === 0){
			res.send(h.errorCode.noContent);
		}else{
			res.json(r);
		}
	});
	
	h.find('posts', function(r){
		if(!r.success){
			//res.json(r);
			console.log('[routesPosts.js:create] autoIncrement Error', r);
			return false;
		}else{
			console.log('[routesPosts.js:create] autoIncrement', r);
		}
	});
	
	/*var doc = {
		id: autoIncrement,
		title: req.body.title,
		content: req.body.content,
		dateCreate: new Date(),
		dateEdit: new Date()
	};

	console.log('[routesPosts.js:create] post:');
	
	h.insert('posts', doc, function(r){
		console.log('[routesPosts.js:create] insert', r);
	});*/


	h.findOne('increments', {_id:'posts'}, function(r){
		if(!r.success){
			jsonReturn( res, r, 'routesPosts:create');
			return false;
		}
			
		var newDoc = {
			mail:mail,
			token:token,
			tokenExpire: new Date().getTime()+(5*60*1000), //5 minutes
			accessKey: 'accesskey'
		};

		// If findOne returns a doc, set the _id field to trigger an UPDATE
		// and not an INSERT (mongodb.save)
		if(r.doc){ newDoc._id = r.doc._id; }

		h.save('users', newDoc, function(r){
			if(r.success) h.sendTokenMail(mail, link);
			jsonReturn( res, r, 'routesUsers:login');
		});
			
	});




};

