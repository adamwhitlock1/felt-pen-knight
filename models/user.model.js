const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
	name: {type: String, required: true, max: 100},
	email: {type: String, required: true, max: 300},
	join_date: {type: Date, default: Date.now},
	//60 is the length of the hash generated from bcrypt
	password: {type: String, required: true, max: 60},
	//wether the user has been banned or not
	banned: {type: Boolean, required: true, default: false},
	//if the user has admin perms
	admin: {type: Boolean, required: false, default: false}
});

UserSchema.methods.validate = function(password) {
	return (!this.banned && bcrypt.compareSync(password, this.password));
};



module.exports = mongoose.model('User', UserSchema);
