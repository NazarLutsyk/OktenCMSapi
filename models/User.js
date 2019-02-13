let PageSchema = require('./Page').schema;

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pages: [PageSchema]
});

exports.schema = UserSchema;
exports.model = mongoose.model('User', UserSchema);
