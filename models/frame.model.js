const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FrameSchema = new Schema({
	url: {type: String, required: true, max: 256},
	created: {type: Date, default: Date.now},
	user: {
		id:{type: ObjectId, required: true, max: 100},
		name: {type: String, required: true, max: 100},
	},
	parent: {type: ObjectId, required: false},
	children: [{type: ObjectId}]
});

FrameSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Frame', FrameSchema);
