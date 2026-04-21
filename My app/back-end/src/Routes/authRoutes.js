const express = require('express');
const router = express.Router();
const {login} = require('../Controllers/authCtrls')

router.post('/login', login);

module.exports= router;

/*
Quick Reference:
401: Access denied, no token sent, user not found.
403: the token is wrong, like the role.
400: missing body fields.
500: the wrong is in the server logic!
*/