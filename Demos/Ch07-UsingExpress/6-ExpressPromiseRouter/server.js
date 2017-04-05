// With Express 4's router 
var router = require('express').Router();
 
router.use('/url', function (req, res, next) {
    Promise.reject().catch(next);
})
 
// With express-promise-router 
var router = require('express-promise-router')();
 
router.use('/url', function (req, res) {
    return Promise.reject();
})

