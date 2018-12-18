const settings = require('../settings.js');

const User = require('../models/user.model');
const Frame = require('../models/frame.model');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

exports.test = function(req, res) {
	res.send('Greetings from the test controller!');
};

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS
	}
});

/**
 * Registers a new user, and sends them a hello email.
 */
exports.register = async function(req, res, next) {

	let name = req.body.name;
	let password = req.body.password;
	let email = req.body.email;

	//TODO: username/email validation
	if(!name || !password || !email){
		return next('User registration requires username, email, and password!');
	}


	try {

		//check that the user with given username does not already exist
		let existing = await User.find({ name: name }).limit(1).exec();
		if(existing.length != 0) {
			return next('User already exists!');
		}

		//create the password hash
		const saltRounds = 10;
		let hash = await bcrypt.hash(password, saltRounds);

		//create and save a new user
		let newUser = new User({
			name: name,
			email: email,
			password: hash
		});

		await newUser.save();

		//send them an email to say hello!
		const mail = {
			from: process.env.GMAIL_USER,
			to: email,
			subject: 'Welcome!',
			html: '<p>Welcome to Felt Pen Knight!</p>'
		};

		await transporter.sendMail(mail);

		//all is well if we make it here, redirect to login page so they can log in.
		return res.redirect('/login');


	} catch (e) {
		return next(e);
	}


};

/*
 * Displays a users profile.
 */
exports.details = async function(req, res, next) {

	if(!req.params.id){
		next('need a valid user id!');
	}

	try {

		//get the user info
		let profile = await User.findById(req.params.id).exec();

		//pagination options
		let page = req.params.page;
		if(!page || page.isNan()){
			page = 1;
		}
		//avoid negative numbers
		page = Math.max(1, page);

		let pageOpts = {
			page: page,
			limit: settings.postsPerPage
		};
		let frames = await Frame.paginate({'user.id': profile.id}, pageOpts);

		res.render('userprofile', {user: req.user, profile: profile, frames: frames.docs});

	} catch (e) {
		next(e);
	}

};
