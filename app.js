//server setup
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.model.js');

const userRoutes = require('./routes/user.route');
const frameRoutes = require('./routes/frame.route');
const otherRoutes = require('./routes/other.route');
const errorHandler = require('./error');
const app = express();


//db connection
const mongoose = require('mongoose');
let db_url= process.env.DBURL;
mongoose.connect(db_url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(fileUpload());
app.use(session({secret: process.env.SESSIONSECRET}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/users', userRoutes);
app.use('/frames', frameRoutes);
app.use('/static', otherRoutes);
app.use(errorHandler);


//Configure passport
passport.use(new LocalStrategy({
	usernameField: 'name',
	passwordField: 'password',
},
function(username, password, done){
	User.findOne({name:username}, function(err, user){

		if(err) {
			return done(err);
		}
		if(!user || !user.validatePassword(password)){
			return done(null, false, {message: 'incorrect username/password'});
		}

		return done(null, user);
	});
}));

passport.serializeUser(function(user, done) {
	done(null,{username: user.name, id: user._id});
});

passport.deserializeUser(function(user, done) {
	User.findById(user.id, function(err, user) {
		done(err, user);
	});
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
})
);

let port = 8888;
app.listen(port, () => {
	console.log(`Running server on port ${port}`);
});
