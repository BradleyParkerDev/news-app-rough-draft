const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const auth = require('../auth')

const {register, login, getUser, updateUser, deleteUser, refreshAccessToken} = usersController;
const {verifyUserToken} = auth;


//Routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-access-token', refreshAccessToken)
router.get('/get-user',verifyUserToken,getUser);
router.put('/update-user',verifyUserToken,updateUser);
router.delete('/delete-user',verifyUserToken,deleteUser);

module.exports = router;