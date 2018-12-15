const express = require('express');
const router = express.Router();
const path = require('path');

//used for sending static files.
router.get('/:file', function(req, res){
	res.sendFile(req.params.file,
		{root: path.join(__dirname, '../static')});
});

//used for sending images
router.get('/images/:image', function(req, res){
	res.sendFile(req.params.image,
		{root: path.join(__dirname, '../static/images')});
});
module.exports = router;
