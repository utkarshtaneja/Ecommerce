const express = require("express");
const router = express.Router();
const controllers = require("../controllers/UserController");

// Routes
router.post('/register', controllers.registerUser);
router.post('/login', controllers.loginUser);
router.post('/verify-otp', controllers.verifyOtp);

module.exports = router;
