const express = require('express');
const {authMiddleware} = require('../middlewares/auth')
const {balance, transfer} = require("../controllers/accountController");

const router = express.Router();

router.route('/balance').get(authMiddleware, balance);
router.route('/transfer').post(authMiddleware, transfer);

module.exports = router;