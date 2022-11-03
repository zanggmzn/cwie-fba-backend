const router = require('express').Router()
const config = require('../configs/app')
// console.log("RT");
router.use(`/api/v${config.apiVersion}`, require('./api'));

module.exports = router