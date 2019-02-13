let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BlockSchema = new Schema({
    screen_name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    selected_block: {
        type: String,
        required: true
    }

});

exports.schema = BlockSchema;
