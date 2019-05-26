const express = require('express');
const router = express.Router();
const cityService = require('./city.service');

// routes
//router.post('/authenticate', authenticate);
router.post('/cityregister', register);
 router.get('/', getAll);
// router.get('/current', getCurrent);
router.get('/:id', getById);
 router.get('/state/:statename', getCityByState);

// router.put('/:id', update);
// router.delete('/:id', _delete);

module.exports = router;

// function authenticate(req, res, next) {
//     cityService.authenticate(req.body)
//         .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
// }


function register(req, res, next) {
    cityService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    cityService.getAll()
        .then(cities => res.json(cities))
        .catch(err => next(err));
}

// function getCurrent(req, res, next) {
//     cityService.getById(req.user.sub)
//         .then(user => user ? res.json(user) : res.sendStatus(404))
//         .catch(err => next(err));
// }

function getById(req, res, next) {
    cityService.getById(req.params.id)
        .then(cities => cities ? res.json(cities) : res.sendStatus(404))
        .catch(err => next(err));
}

function getCityByState(req, res, next) {
    cityService.getCityByState(req.params.statename)
    .then(cities => cities ? res.json(cities) : res.sendStatus(404))
        .catch(err => next(err));
}


// function update(req, res, next) {
//     cityService.update(req.params.id, req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

// function _delete(req, res, next) {
//     cityService.delete(req.params.id)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }