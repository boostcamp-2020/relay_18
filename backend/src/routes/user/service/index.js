const wrap = require('../../../modules/wrapper');
var express = require('express');
var router = express.Router();


//회원가입
const signIn = require('./signup');
router.use('/signin', wrap(signIn));

//로그인

const signUp = require('./singin');
router.use('/signup', wrap(signUp));


//토큰 검증
// const getUser = require('./users');
// const verifyToken = require('../../../middlewares/token').verifyToken;
// router.use('/getUser', verifyToken,getUser);

//사용자 정보 가져오기
//const users = require('./users');
//router.use('/users', users);

module.exports = router;