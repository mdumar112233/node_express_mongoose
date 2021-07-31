// const express = require('express');
// const multer = require('multer');

// const UPLOADS_FOLDER = './uploads/';

// const upload = multer({
//     dest: UPLOADS_FOLDER,
//     limits: {
//         fieldSize: 100000,
//     },
//     fileFilter: (req, res, cb) => {

//     }
// });

// const app = express();

// app.use(express.json());

// app.post('/', upload.single('avatar'), (req, res) => {
//     res.send('This is home page');
// });

// // app.post('/', upload.array('avatar', 2), (req, res) => {
// //     res.send('This is home page');
// // });

// // app.post('/', upload.fields([
// //     {name: "avatar", maxCount: 1},
// //     {name: "gallery", maxCount: 2},
// // ]), (req, res) => {
// //     res.send('This is home page');
// // });

// app.listen(3000, () => console.log('your server is runing at 3000'));
/// //////////////////////////
// WITH MONGOOSE BUILD A NEW APP
const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandlar/todoHandler');

const app = express();

app.use(express.json());

const DB = 'mongodb://mdfaruk112233:mdfaruk112233@cluster0.ij0ac.mongodb.net/todo-app?retryWrites=true&w=majority';
// database connections with mongoose
mongoose
    .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('conneted'))
    .catch((err) => console.log(err));

app.use('/todo', todoHandler);

app.get('/', (req, res) => {
    res.send('This is home page name is new one');
});

app.listen(3000, () => console.log('your server is runing at 3000'));
