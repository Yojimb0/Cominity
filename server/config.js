var config = {};

config.mgUrl = 'mongodb://localhost:27017/cominity';
config.cwd = 'dev';
config.mg = require('mongodb').MongoClient;
config.port = 3000;

// TEMP - Init BDD
/*config.mg.connect(config.mgUrl, function(err, db) {
	if (err) throw err;
	posts = db.collection('posts');
	posts.remove({}, function(err) { if (err) throw err; });
	posts.insert({id: '1', title: 'Post 1', content: 'Content 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, pariatur, vero, odit temporibus quia hic molestiae explicabo veritatis nostrum quisquam excepturi veniam deserunt vel voluptatum voluptatem sint aliquam! Numquam, harum?' }, function(err){});
	posts.insert({id: '2', title: 'Post 2', content: 'Content 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, pariatur, vero, odit temporibus quia hic molestiae explicabo veritatis nostrum quisquam excepturi veniam deserunt vel voluptatum voluptatem sint aliquam! Numquam, harum?' }, function(err){});
	posts.insert({id: '3', title: 'Post 3', content: 'Content 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, pariatur, vero, odit temporibus quia hic molestiae explicabo veritatis nostrum quisquam excepturi veniam deserunt vel voluptatum voluptatem sint aliquam! Numquam, harum?' }, function(err){});

	comments = db.collection('comments');
	comments.remove({}, function(err) { if (err) throw err; });
	comments.insert({id: '1', title: 'Comment 1 (Post 1)', posts: '1', content: 'Content 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, pariatur, vero, odit temporibus quia hic molestiae explicabo veritatis nostrum quisquam excepturi veniam deserunt vel voluptatum voluptatem sint aliquam! Numquam, harum?' }, function(err){});
	comments.insert({id: '2', title: 'Comment 2 (Post 1)', posts: '1', content: 'Content 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, pariatur, vero, odit temporibus quia hic molestiae explicabo veritatis nostrum quisquam excepturi veniam deserunt vel voluptatum voluptatem sint aliquam! Numquam, harum?' }, function(err){});
	comments.insert({id: '3', title: 'Comment 3 (Post 2)', posts: '2', content: 'Content 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, pariatur, vero, odit temporibus quia hic molestiae explicabo veritatis nostrum quisquam excepturi veniam deserunt vel voluptatum voluptatem sint aliquam! Numquam, harum?' }, function(err){});
});*/

module.exports = config;