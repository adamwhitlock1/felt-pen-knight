module.exports = function(err, req, res, next){
	console.log(err);
	res.render('error', {
		user: req.user,
		message: err,
	});
};
