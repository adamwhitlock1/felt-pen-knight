const express = require('express');
const router = express.Router();

const frameController = require('../controllers/frame.controller');

router.get('/:frameid', frameController.getFrame);
router.post('/:parentid/new', frameController.postFrame);

module.exports = router;
