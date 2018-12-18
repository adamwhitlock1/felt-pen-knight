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
router.get('/', function(req, res) {
	res.render('login',  {user: req.user});
});
router.get('/register', function(req, res) {
	res.render('register',  {user: req.user});
});

router.get('/hidden', function(req, res) {
	if(req.isAuthenticated()){
		res.render('hidden', {user: req.user});
	} else {
		res.send('no!');
	}
});



module.exports = router;
