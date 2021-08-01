const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const userSchema = require('../schema/userSchema');

const User = new mongoose.model('User', userSchema);

// SIGNUP
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

// SIGNIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            if (isValidPassword) {
                const token = jwt.sign(
                    {
                        username: user[0].username,
                        userId: user[0]._id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '1h',
                    }
                );
                res.status(200).json({
                    access_token: token,
                    message: 'login successfully',
                });
            } else {
                res.status(401).json({
                    error: 'authentication faild',
                });
            }
        } else {
            res.status(401).json({
                error: 'authentication faild',
            });
        }
    } catch {
        res.status(401).json({
            error: 'authentication faild',
        });
    }
});

module.exports = router;
