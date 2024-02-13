const express = require('express');
const {authMiddleware} = require('../middlewares/auth')
const {balance} = require("../controllers/accountController");

const router = express.Router();

router.route('/balance').get(authMiddleware, balance);


module.exports = router;