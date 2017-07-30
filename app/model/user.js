var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', userSchema);