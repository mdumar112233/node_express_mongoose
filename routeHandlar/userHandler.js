const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const router = express.Router();
const userSchema = require('../schema/userSchema');

const User = new mongoose.model('User', userSchema);

// get all the todos
router.post('/signup', async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashPassword,
        });
        await newUser.save();
        res.status(200).json({
            newUser,
            error: 'signup successfully',
        });
    } catch {
        res.status(500).json({
            message: 'signup error find!!!',
        });
    }
});

module.exports = router;
