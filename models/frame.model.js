const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FrameSchema = new Schema({
	url: {type: String, required: true, max: 256},
	parent: {type: ObjectId, required: true},
	children: [{type: ObjectId}]
});


module.exports = mongoose.model('Frame', FrameSchema);
