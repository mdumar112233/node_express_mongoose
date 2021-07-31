const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const todoSchema = require('./todoSchema/todoSchema');

const Todo = new mongoose.model('Todo', todoSchema);

// get all the todos

router.get('/', async (req, res) => {});

// get a todo by id
router.get('/:id', async (req, res) => {});

// post a todo
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
        if (err) {
            res.status(5000).json({
                error: 'there was a server error',
            });
        } else {
            res.status(200).json({
                meaage: 'todo was inserted sucessfully',
            });
        }
    });
});

// post multiple todo
router.get('/all', async (req, res) => {});

// put todo
router.put('/:id', async (req, res) => {});

// delete todo
router.delete('/:id', async (req, res) => {});
module.exports = router;
