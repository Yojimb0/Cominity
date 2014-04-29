var h = require('./helpers'),
	configPrivate = require('./configPrivate');



/* LOGIN
/* Create token, store in db, send mail
/*   1st case: user doesn't exist
/*		- Create token+expiry + accessKey
/*		- Add to DB
/*		- Send mail
/*   2nd case: user exists
/*		- Create token
/*		- Edit DB to change token+expiry
/*		- Send mail
---------------------------------------*/
exports.login = function(req, res){
	var mail = req.body.mail,
		url = req.headers.host,
		token = h.getToken(),
		link = 'http://'+url+'/auth/'+mail+'/'+token;

	if(!h.isValidEmail(mail)){
		h.jsonReturn( res, {success:false, message:'Mail invalid'}, 'routesUsers:login');
		return false;
	}

	console.log('[routesUsers:login] mail:', mail);

	h.findOne('users', {mail: mail}, function(r){
		if(!r.success){
			h.jsonReturn( res, r, 'routesUsers:login');
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
			h.jsonReturn( res, r, 'routesUsers:login');
		});
			
	});

};

/* AUTH
/* Compare token from the link with db token
---------------------------------------*/
exports.auth = function(req, res){
	var token = req.params.token,
		mail = req.params.mail;

	console.log('[routesUsers:auth] '+mail+' / '+token);

	h.findOne('users', {mail: mail, token: token}, function(r){
		
		if(r.success && !r.doc){
			r = {success:false, message:'Token doesnt match'};
		}

		if(r.success && new Date().getTime() > r.doc.tokenExpire){
			r = {success:false, message:'Token expired'};
		}

		h.jsonReturn( res, r, 'routesUsers:auth');
		

	});
};

// exports.getUsersInCommunity = function(req, res){
// 	if()
// };
