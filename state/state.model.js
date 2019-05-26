const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    statename: { type: String, unique: true, required: true },
});

stateSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('State', stateSchema);