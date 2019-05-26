const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
    hospitalid: { type: String, unique: true, required: true },
    hospitalname: { type: String, required: true },
    hash: { type: String, required: true },
    hospitaladdress: { type: String },
    hospitalcontact: { type: String},
    hospitalStbDate: { type: Date, default: Date.now },
    hospitalSpecialist: { type: String},
    checkupfees: { type: String},
    tatkalcheckupfees: { type: String},
    morningstarttime: { type: String},
    morningendtime: { type: String},
    afternoonstarttime: { type: String},
    afternoonendtime: { type: String},
    eveningstarttime: { type: String},
    eveningendtime: { type: String},
    registerDate: { type: Date, default: Date.now },
    state: { type: String},
    city: { type: String},

});

hospitalSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Hospital', hospitalSchema);