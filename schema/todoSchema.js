const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    data: {
        type: Date,
        default: Date.now,
    },
});
// instance method
todoSchema.methods = {
    findActive: () => mongoose.model('Todo').find({ status: 'active' }),
};

// static methods
// todoSchema.statics = {
//     findJs: () => this.find({ title: /js/i }),
// };

// query helpers
// todoSchema.query = {
//     byLanguage: function(language) {
//         return this.find({ title: new RegExp(language, 'i') });
//     },
// };

module.exports = todoSchema;
