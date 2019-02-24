const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/test', userController.test);
router.post('/register', userController.register);
router.post('/login', userController.register);
router.get('/:id', userController.details);
module.exports = router;
