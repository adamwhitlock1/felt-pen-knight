const express = require('express');
const router = express.Router();

const frameController = require('../controllers/frame.controller');

router.get('/:frameid', frameController.getThread);
router.post('/new/:parent_id', frameController.postFrame);

module.exports = router;
