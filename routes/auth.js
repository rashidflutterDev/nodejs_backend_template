const express = require('express');

const router = express.Router();


router.post('/login', (req, res) => {
    res.send('Login');
});

router.post('/register', (req, res) => {
    res.send('Register');
});

router.post('/forgot-password', (req, res) => {
    res.send('Forgot Password');
});


router.post('/reset-password', (req, res) => {
    res.send('Reset Password');
});

router.post('/verify-otp', (req, res) => {
    res.send('Verify Email');
});

router.post('/logout', (req, res) => {
    res.send('Logout');
});

module.exports = router