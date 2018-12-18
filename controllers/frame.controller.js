const Frame  = require('../models/frame.model');
const shortid = require('shortid');
const imageSize = require('image-size');

exports.getFrame = (req, res, next) => {
	console.log(req.params);
};


exports.postFrame = (req, res, next) => {
	if(!req.isAuthenticated()) {
		return next('you must log in!');
	}
	if(Object.keys(req.files).length == 0) {
		return next('no files :(');
	}

	let size = imageSize(req.files.image.data);
	if(size.width != 640 || size.height != 480){
		return next('image must be exactly 640x480');
	}

	let image = req.files.image;
	let extension = image.name.split('.').pop();
	let url = req.user.name + shortid.generate() + '.' + extension;

	let newFrame = new Frame({
		url: url,
		user: {id:req.user.id, name: req.user.name}
	});

	newFrame.save( (err) => {
		if(err){
			return next(err);
		}
		//save the image
		image.mv('./static/images/' + url, function(err) {
			if(err) {
				return next(err);
			}

			res.redirect('/');

		});

	});



};
