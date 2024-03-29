const express = require('express');
const router = express.Router();

const {register, login, getUser, updateUser, deleteUser, refreshAccessToken} = require('../controllers/usersController');
const {verifyUserToken} = require('../auth')
//Routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-access-token', refreshAccessToken)
router.get('/get-user',verifyUserToken,getUser);
router.put('/update-user',verifyUserToken,updateUser);
router.delete('/delete-user',verifyUserToken,deleteUser);

module.exports = router;