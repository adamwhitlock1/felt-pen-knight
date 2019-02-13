const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.post('/register', userController.register);
router.post('/:id/ban', userController.ban);
//router.get('/:id/verify', userController.verify);
router.get('/:id/profile', userController.profile);
module.exports = router;
