const express = require('express');
const router = express.Router();


//TODO: put this in its own file.
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/post', function(req, res) {
	res.render('post',  {user: req.user});
});

router.get('/login', function(req, res) {
	res.render('login',  {user: req.user});
});

router.get('/register', function(req, res) {
	res.render('register',  {user: req.user});
});

const Frame = require('../models/frame.model');
const settings = require('../settings.js');

router.get('/', async function(req, res, next) {

	try {
		let recentFrames = await Frame.find()
			.sort({created: -1})
			.limit(settings.postsPerPage)
			.exec();

		let startFrame = await Frame.findOne()
			.sort({created: 1})
			.exec();

		return res.render('index', {
			user: req.user,
			recentFrames: recentFrames,
			startFrame: startFrame
		});

	} catch (e) {
		return next(e);
	}

});

module.exports = router;
