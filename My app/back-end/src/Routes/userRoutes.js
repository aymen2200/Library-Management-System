const express = require('express');
const router = express.Router();
const {register, login, getAllUsers, getMe,userHistory, deleteUser,changePassword, changeName}= require('../Controllers/userCtrls');
const { authenticate, authorize } = require('../middlewares');

router.post('/register', register);
router.get('/get_all_users',authenticate, authorize, getAllUsers);
router.post('/login', login);
router.get('/get_user',authenticate, getMe);
router.get('/get_my_history', authenticate, userHistory);
router.delete('/remove/:id', deleteUser);
router.put('/change-password', authenticate, changePassword);
router.put('/change-name', authenticate, changeName);

module.exports= router;