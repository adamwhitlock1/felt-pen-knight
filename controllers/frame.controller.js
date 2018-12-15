const Frame  = require('../models/frame.model');
const shortid = require('shortid');
const imageSize = require('image-size');

exports.getThread = function(req, res) {
	//TODO
};


function GetUniqueFileName() {

}

exports.postFrame = function(req, res) {
	if(!req.isAuthenticated()) {
		return res.send('you must log in!');
	}
	if(Object.keys(req.files).length == 0) {
		return res.send('no files :(');
	}

	let size = imageSize(req.files.image.data);
	if(size.width != 640 || size.height != 480){
		return res.send('image must be exactly 640x480');
	}
	console.log(size);

	let image = req.files.image;
	let extension = req.files.image.name.split('.').pop();
	let url = req.user.name + shortid.generate() + '.' + extension;
	image.mv('./static/images/' + url, function(err) {
		if(err) {
			return res.send(err);
		}
		res.send('yeet!');
	})
};
