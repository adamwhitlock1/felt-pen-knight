const Frame  = require('../models/frame.model');
const shortid = require('shortid');
const imageSize = require('image-size');

exports.getFrame = async function(req, res, next) {
	let frameId = req.params.frameid;
	if(!frameId) {
		return next('parent id is not valid!');
	}

	try {

		const subpop = {
			path: 'parents children',
			select: 'author id url created',
			populate: {
				path: 'author',
				select: 'name id'
			}
		};

		let frame = await Frame.findById(frameId)
			.populate('author', 'name id')
			.populate(subpop)
			.exec();

		res.render('framedetail', {
			user: req.user,
			frame: frame,
		});

	} catch (e) {
		return next(e);
	}

};


exports.postFrame = async function(req, res, next) {

	if(!req.isAuthenticated()) {
		return next('you must log in!');
	}

	//a file must be submitted
	if(Object.keys(req.files).length == 0) {
		return next('nothing submitted!');
	}

	let image = req.files.image;

	//must be an image
	if(!image.mimetype.includes('image')) {
		return next('the file is not an image!');
	}

	let size = imageSize(req.files.image.data);
	if(size.width != 640 || size.height != 480){
		return next('image must be exactly 640x480');
	}

	let extension = image.name.split('.').pop();
	let url = req.user.name + shortid.generate() + '.' + extension;

	try{
		let parentId = req.params.parentid;
		let parent = await Frame.findById(parentId);
		if(!parent){
			return next('parent does not exist!');
		}

		const maxParents = 5;
		let parents = parent.parents;
		parents.push(parentId);
		if(parents.length > maxParents) {
			parents = parents.slice(1, maxParents + 1);
		}

		let newFrame = new Frame({
			url: url,
			parents: parents,
			author: req.user.id,
		});

		let save = await newFrame.save();

		parent.update({
			$push: {children: save.id}
		}, (err) =>{
			console.log(err);
			console.log("hiya!");
		});

		await image.mv('./static/images/' + url);

		//send them to their post!
		return res.redirect('/frames/' + save.id);

	} catch (e) {
		return next(e);
	}

};
