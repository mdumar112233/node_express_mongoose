const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const todoSchema = require('../schema/todoSchema');

const Todo = new mongoose.model('Todo', todoSchema);

// get all the todos

router.get('/', async (req, res) => {
    await Todo.find({ status: 'active' })
        .select({
            _id: 0,
            _v: 0,
        })
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    error: 'there was a server error',
                });
            } else {
                res.status(200).json({
                    result: data,
                    message: 'todo was inserted sucessfully',
                });
            }
        });
});

// get a todo by id | one way
// router.get('/:id', async (req, res) => {
//     try {
//         const data = await Todo.find({ _id: req.params.id });
//         res.status(200).json({
//             result: data,
//             message: 'todo was inserted sucessfully',
//         });
//     } catch {
//         res.status(500).json({
//             error: 'there was a server error',
//         });
//     }
// });
// get active todo | second way
router.get('/active', async (req, res) => {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({
        data,
    });
});

// get js todo with static method
// router.get('/js', async (req, res) => {
//     const data = await Todo.findJs();
//     res.status(200).json({
//         data,
//     });
// });

// get todo by using query helper
router.get('/language', async (req, res) => {
    const data = await Todo.find().byLanguage('umar');
    res.status(200).json({
        data,
    });
});

// post a todo
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
        if (err) {
            res.status(500).json({
                error: 'there was a server error',
            });
        } else {
            res.status(200).json({
                message: 'todo was inserted sucessfully',
            });
        }
    });
});

// post multiple todo
router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).json({
                error: 'there was a server error',
            });
        } else {
            res.status(200).json({
                message: 'todo was inserted sucessfully',
            });
        }
    });
});

// put todo
router.put('/:id', async (req, res) => {
    await Todo.updateOne(
        { _id: req.params.id },
        {
            $set: {
                status: 'active',
            },
        },
        {
            new: true,
        },
        (err) => {
            if (err) {
                res.status(500).json({
                    error: 'there was a server error',
                });
            } else {
                res.status(200).json({
                    message: 'todo was updated sucessfully',
                });
            }
        }
    );
});

// delete todo
router.delete('/:id', async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: 'there was a server error',
            });
        } else {
            res.status(200).json({
                message: 'todo was delete sucessfully',
            });
        }
    });
});

module.exports = router;
