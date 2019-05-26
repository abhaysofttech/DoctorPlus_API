const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const City = db.City;

module.exports = {
    getAll,
    getById,
    getCityByState,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await City.find().select('-hash');
}

async function getById(id) {
    return await City.findById(id).select('-hash');
}
async function getCityByState(userParam) {
     return await City.find({ statename: userParam }).select('-hash');
 }
async function create(userParam) {
    // validate
    if (await City.findOne({ cityname: userParam.cityname })) {
        throw 'Cityname "' + userParam.cityname + '" is already taken';
    }

    const city = new City(userParam);

    // save user
    await city.save();
}

async function update(id, userParam) {
    const city = await City.findById(id);

    // validate
    if (!city) throw 'City not found';
    if (city.cityname !== userParam.cityname && await Hospital.findOne({ cityname: userParam.cityname })) {
        throw 'Cityname "' + userParam.cityname + '" is already taken';
    }


    // copy userParam properties to user
    Object.assign(city, userParam);

    await city.save();
}

async function _delete(id) {
    await City.findByIdAndRemove(id);
}