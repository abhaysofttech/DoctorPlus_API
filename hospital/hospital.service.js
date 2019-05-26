const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Hospital = db.Hospital;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await Hospital.find().select('-hash');
}

async function getById(id) {
    return await Hospital.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await Hospital.findOne({ hospitalid: userParam.hospitalid })) {
        throw 'Hospitalname "' + userParam.hospitalid + '" is already taken';
    }

    const hospital = new Hospital(userParam);

    // hash password
    if (userParam.password) {
        hospital.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await hospital.save();
}

async function update(id, userParam) {
    const hospital = await Hospital.findById(id);

    // validate
    if (!hospital) throw 'Hospital not found';
    if (hospital.hospitalid !== userParam.hospitalid && await Hospital.findOne({ hospitalid: userParam.hospitalid })) {
        throw 'Hospitalid "' + userParam.hospitalid + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(hospital, userParam);

    await hospital.save();
}

async function _delete(id) {
    await Hospital.findByIdAndRemove(id);
}