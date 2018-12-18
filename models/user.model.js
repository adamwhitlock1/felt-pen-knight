const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
	name: {type: String, required: true, max: 100},
	email: {type: String, required: true, max: 300},
	join_date: {type: Date, default: Date.now},
	//60 is the length of the hash generated from bcrypt
	password: {type: String, required: true, max: 60}
});

UserSchema.methods.validatePassword = function(password) {
	//TODO: is there a way to make this async?
	return bcrypt.compareSync(password, this.password);
};



module.exports = mongoose.model('User', UserSchema);
