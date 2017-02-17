var express = require('express');
var router = express.Router();
// var Profile = require('../models/Profile');
var controllers = require('../controllers');

router.post('/:resource', function(req, res, next){

	var resource = req.params.resource
	var controller = controllers[resource]

	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Resource ' + resource + ' not supported'
		})
	}

	var formData = req.body
	controller
	.post(formData)
	.then(function(result){
		res.json({
			confirmation: 'success',
			result: result
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})

	// if(resource == 'profile'){
		// Profile.create(formData, function(err,profile){
		// 	if(err){
		// 		res.json({
		// 			confirmation:'fail',
		// 			message:err
		// 		})
		// 		return
		// 	}
		// 	res.json({
		// 		confirmation:'success',
		// 		result:profile
		// 	})
		// })
		// return
	// }

	// res.json({
	// 	confirmation: 'fail',
	// 	message: 'Resource ' + resource + ' not supported.'
	// })

})

router.get('/:resource', function(req, res, next) {

	var resource = req.params.resource
	var controller = controllers[resource]

	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Resource ' + resource + ' not supported'
		})
	}

	controller
	.get(req.query)
	.then(function(results){
		res.json({
			confirmation: 'success',
			results: results
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})

	// if(resource == 'profile'){
		// Profile.find(null, function(err,profiles){
		// 	if(err){
		// 		res.json({
		// 			confirmation: 'fail',
		// 			message: err
		// 		})
		// 		return 
		// 	}
		// 	if(profile == null){
		// 		res.json({
		// 			confirmation: 'fail',
		// 			message: 'Profile not found'
		// 		})
		// 		return 
		// 	}
		// 	res.json({
		// 		confirmation: 'success',
		// 		results: profiles
		// 	})
		// })
		// return
	// }

	// res.json({
	// 	confirmation: 'fail',
	// 	message: 'Resource ' + resource + ' not supported'
	// })

});

router.get('/:resource/:id', function(req,res,next){

	var resource = req.params.resource
	var controller = controllers[resource]
	var id = req.params.id

	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Resource ' + resource + ' not supported'
		})
	}

	controller
	.getById(id)
	.then(function(result){
		res.json({
			confirmation: 'success',
			result: result
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})

	// if(resource == 'profile'){
		// Profile.findById(id, function(err,profile){
		// 	if(err){
		// 		res.json({
		// 			confirmation: 'fail',
		// 			message: 'Profile not found'
		// 		})
		// 		return
		// 	}
		// 	res.json({
		// 		confirmation: 'success',
		// 		result: profile
		// 	})
		// })
		// return
	// }

	// res.json({
	// 	confirmation: 'fail',
	// 	message: 'Resource ' + resource + ' not supported.'
	// })

})

module.exports = router;