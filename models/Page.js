let BlockSchema = require('./Block').schema;

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    project_title: {
        type: String,
        required: true
    },
    listBlocks: [BlockSchema]
});

exports.schema = PageSchema;
