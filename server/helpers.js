var c = require('./config'),
	configPrivate = require('./configPrivate'),
	nodemailer = require("nodemailer");

var helpers = {};

helpers.errorCode = {
	noContent: 204
};

helpers.getToken = function(){
	var r = Math.random().toString().substring(5),
		t = new Date().getTime().toString().substring(5);
	return parseInt(r + t, 10).toString(36);
};

helpers.isValidEmail = function(email){
	return (/\S+@\S+\.\S+/).test(email);
};

helpers.jsonReturn = function(responseObject, jsonToSendBack, logPrefix){
	if(logPrefix) helpers.jsonLog(logPrefix, jsonToSendBack);
	responseObject.json(jsonToSendBack);
};

helpers.jsonLog = function(prefix, data){
	console.log('['+prefix+']', JSON.stringify(data));
};

helpers.autoIncrement = function(collectionToIncrement, callback) {
	c.mg.connect(c.mgUrl, function(err, db) {
		if (err){
			// console.log('[helpers.js:insert] DB connection failed');
			callback({'success':false, 'message':'DB connection failed'});
		}else{
			collection = db.collection('increments');
			collection.findAndModify(
				{_id:collectionToIncrement}, [], {$inc: {"seq": 1}}, {},
				function(err, docs){
					if (err){
						// console.log('[helpers.js:insert] insert failed');
						callback({'success':false, 'message':'autoIncrement failed'});
					}else{
						// console.log('[helpers.js:insert] id:', docs[0]);
						callback({'success':true, 'docs':docs});
					}
				}
			);
		}
	});
};


helpers.insert = function(table, doc, callback){
	c.mg.connect(c.mgUrl, function(err, db) {
		if (err){
			// console.log('[helpers.js:insert] DB connection failed');
			callback({'success':false, 'message':'DB connection failed'});
		}else{
			collection = db.collection(table);
			collection.insert(doc, {safe: true}, function(err, docs){
				if (err){
					// console.log('[helpers.js:insert] insert failed');
					callback({'success':false, 'message':'Insert failed'});
				}else{
					// console.log('[helpers.js:insert] id:', docs[0]);
					callback({'success':true, 'docs':docs});
				}
			});
		}
	});
};

helpers.save = function(table, doc, callback){
	c.mg.connect(c.mgUrl, function(err, db) {
		if (err){
			// console.log('[helpers.js:save] DB connection failed');
			callback({'success':false, 'message':'DB connection failed'});
		}else{
			collection = db.collection(table);
			collection.save(doc, {safe: true}, function(err, docs){
				if (err){
					// console.log('[helpers.js:save] save failed');
					callback({'success':false, 'message':'Save failed'});
				}else{
					// console.log('[helpers.js:save] id:', docs[0]);
					callback({'success':true, 'docs':docs});
				}
			});
		}
	});
};

helpers.findOne = function(table, query, callback){
	c.mg.connect(c.mgUrl, function(err, db) {
		if (err){
			// console.log('[helpers.js:findOne] DB connection failed');
			callback({'success':false, 'message':'DB connection failed'});
		}else{
			collection = db.collection(table);
			collection.findOne(query, function(err, doc){
				if (err){
					// console.log('[helpers.js:findOne] findOne failed');
					callback({'success':false, 'message':'findOne failed'});
				}else{
					// console.log('[helpers.js:findOne] doc:', doc);
					callback({'success':true, 'doc':doc});
				}
			});
		}
	});
};

helpers.find = function(table, query, callback){
	c.mg.connect(c.mgUrl, function(err, db) {
		if (err){
			callback({'success':false, 'message':'DB connection failed'});
		}else{
			collection = db.collection(table);
			collection.find(query).toArray(function(err, docs){
				if (err){
					callback({'success':false, 'message':'Insert failed'});
				}else{
					// console.log('Found ' + docs);
					callback({'success':true, 'docs':docs});
				}
			});
		}
	});
};

helpers.sendTokenMail = function(mail, link, callback){
	// create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport("SMTP",{
		service: "Gmail",
		auth: {
			user: configPrivate.gmailLog,
			pass: configPrivate.gmailPass
		}
	});

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: "Cominity <phoenix2509+cominity@gmail.com>", // sender address
		to: mail, // list of receivers
		subject: "Hello", // Subject line
		text: "Hello world\n"+link, // plaintext body
		html: "Hello world<br><a href=\""+link+"\">"+link+"</a>" // html body
	};

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
			console.log("[helpers:sendTokenMail] ", error);
			if(callback) callback();
		}else{
			console.log("[helpers:sendTokenMail] Message sent");
			if(callback) callback();
		}

		// if you don't want to use this transport object anymore, uncomment following line
		smtpTransport.close(); // shut down the connection pool, no more messages
	});
};

module.exports = helpers;