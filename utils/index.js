const { checkPermissions } = require('./checkPermissions');
const { createTokenUser } = require('./createTokenUser');
const {createJWT, isTokenValid, attachCookiesToReponse} = require('./jwt');

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToReponse,
    createTokenUser,
    checkPermissions
}