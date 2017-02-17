var Comment = require('../models/Comment');
var Promise = require('bluebird');

module.exports = {

	get: function(params){
		return new Promise(function(resolve,reject){
			Comment.find(params,function(err,comments){
				if(err){
					reject(err)
					return
				}

				var results = []
				comments.forEach(function(comment, i){
					results.push(comment.summary())
				})
				resolve(results)
			})
		})
	},
	getById: function(id){
		return new Promise(function(resolve,reject){
			Comment.findById(id, function(err,comment){
				if(err){
					reject(new Error('comment Not Found'))
					return
				}

				if(comment == null){
					reject(new Error('comment Not Found'))
					return
				}

				resolve(comment.summary())
			})
		})
	},
	post: function(body){
		return new Promise(function(resolve,reject){
			Comment.create(body,function(err,comment){
				if(err){
					reject(err)
					return
				}
				resolve(comment.summary())
			})
		})
	}

}