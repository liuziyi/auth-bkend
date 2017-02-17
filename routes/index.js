var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Auth Backend', visitor: 'Dan' });
});

router.get('/profile', function(req, res, next) {

	if(req.session == null){
		res.render('profile', null)
		return 
	}

	if(req.session.token == null){
		res.render('profile', null)
		return 
	}

  	jwt.verify(req.session.token, process.env.TOKEN_SECRET, function(err,decode){
		if(err){
			res.render('profile', null)
			return 
		}

		var user = null
		controllers.profile
		.getById(decode.id)
		.then(function(profile){
			user = profile
			//fetch profile comments
			return controllers.comment.get({profile: profile.id})
		})
		.then(function(comments){
			var data = {
				profile: user,
				comments: comments
			}
			res.render('profile', data)
		})
		.catch(function(err){
			res.render('profile', null)
		})

	})

});

module.exports = router;
