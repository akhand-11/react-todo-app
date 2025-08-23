const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    text:{type: String, required: true},
    category:{type: String, default: "Others"},
    completed:{type: Boolean, default: false},
    dueDate:{type: Date, default: null},
    comments:{type: [String], default: []},
});

module.exports = mongoose.model('Task', taskSchema);

