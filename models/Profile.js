 var mongoose = require('mongoose');

 var ProfileSchema = new mongoose.Schema({
 	email: {type: String, default:''},
 	username: {type: String, default:''},
 	password: {type: String, default:''},
 	timestamp: {type: Date, default: Date.now}
 });

 ProfileSchema.methods.summary = function(){
 	var summary = {
 		id: this._id.toString(),
 		email: this.email,
 		username: this.username,
 		timestamp: this.timestamp
 	}
 	return summary
 }

 module.exports = mongoose.model('profiles', ProfileSchema)