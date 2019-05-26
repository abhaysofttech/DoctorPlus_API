const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const State = db.State;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await State.find().select('-hash');
}

async function getById(id) {
    return await State.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await State.findOne({ statename: userParam.statename })) {
        throw 'Statename "' + userParam.statename + '" is already taken';
    }

    const state = new State(userParam);

    // save user
    await state.save();
}

async function update(id, userParam) {
    const state = await State.findById(id);

    // validate
    if (!state) throw 'State not found';
    if (state.statename !== userParam.statename && await Hospital.findOne({ statename: userParam.statename })) {
        throw 'Statename "' + userParam.statename + '" is already taken';
    }


    // copy userParam properties to user
    Object.assign(state, userParam);

    await state.save();
}

async function _delete(id) {
    await State.findByIdAndRemove(id);
}