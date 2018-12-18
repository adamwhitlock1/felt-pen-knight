const User = require('../models/user.model');
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
exports.register = function(req, res, next) {

	let name = req.body.name;
	let password = req.body.password;
	let email = req.body.email;

	//TODO: username/email validation
	if(!name || !password || !email){
		return next('User registration requires username, email, and password!');
	}

	User.find({ name: name }, '_id',  function(err, user){
		if(err){
			return next(err);
		}

		//only add the user if they do not already exist
		if(user.length !== 0) {
			return next('user already exists!');
		}


		//create a new password
		const saltRounds = 10;
		bcrypt.hash(password, saltRounds, function(err, hash){

			if(err){
				return next(err);
			}


			//save the user
			let newUser = new User({
				name: name,
				email: email,
				password: hash
			});

			newUser.save((err) => {
				if (err) {
					return next(err);
				}

				//send them an email to say hello!
				const mail = {
					from: process.env.GMAIL_USER,
					to: email,
					subject: 'Welcome!',
					html: '<p>Welcome to Felt Pen Knight!</p>'
				};

				transporter.sendMail(mail, function(err, info) {
					if(err){
						console.log(err);
					} else {
						console.log(info);
					}
				});

				//TODO: redirect to homepage
				res.redirect('/');
			});
		});
	}).limit(1);
};

/*
 * Gets a users details.
 */
exports.details = function(req, res, next) {
	User.findById(req.params.id, (err, user) => {
		if(err){
			return next(err);
		}
		res.render('userprofile', {user: req.user, profile: user});
	});

};
