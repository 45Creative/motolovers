exports.app = require('./server/functions/app').app;
exports.onPostWrite = require('./server/functions/db').onPostWrite;
exports.countlikechange = require('./server/functions/db').countlikechange;
exports.recountlikes = require('./server/functions/db').recountlikes;

/**
 * USER FUNCTIONS
 */
exports.createdUserAccount = require('./server/functions/user').createdUserAccount;
exports.deleteUserAccount = require('./server/functions/user').deleteUserAccount;

/**
 * EMAIL FUNCTIONS
 */
exports.sendEmailConfirmation = require('./server/functions/email').sendEmailConfirmation;