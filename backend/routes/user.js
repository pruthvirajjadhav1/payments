const express = require('express');
const {signup, signin, userUpdate, bulkUsers} = require("../controllers/userController");
const {authMiddleware} = require("../middlewares/auth")

const router = express.Router();

router.route('/signup').post(signup);

router.route('/signin').post(signin);

router.route('/update').put(authMiddleware, userUpdate);

router.route('/bulk').get(authMiddleware, bulkUsers);

module.exports = router;