const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FrameSchema = new Schema({
	url: {type: String, required: true, max: 256},

	created: {type: Date, default: Date.now},
	author: {type: ObjectId, required: true, ref: 'User'},

	parents: [{type: ObjectId, required: true, ref: 'Frame'}],
	children: [{type: ObjectId, ref: 'Frame'}]
});

FrameSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Frame', FrameSchema);
