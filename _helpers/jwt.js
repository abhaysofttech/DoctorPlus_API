const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');
const hospitalService = require('../hospital/hospital.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/hospital/hospitalregister',
            '/state/stateregister',
            '/state/',
            '/city/cityregister',
            '/city',
            '/city/state/:statename'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);
    const hospital = await hospitalService.getById(payload.sub);
   // const city = await cityService.getCityByState(payload.sub);

    // revoke token if user no longer exists
    if (!user && !hospital) {
        return done(null, true);
    }

    done();
};