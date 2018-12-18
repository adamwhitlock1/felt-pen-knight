const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FrameSchema = new Schema({
	url: {type: String, required: true, max: 256},
	user: {
		id:{type: ObjectId, required: true, max: 100},
		name: {type: String, required: true, max: 100},
	},
	parent: {type: ObjectId, required: false},
	children: [{type: ObjectId}]
});


module.exports = mongoose.model('Frame', FrameSchema);
