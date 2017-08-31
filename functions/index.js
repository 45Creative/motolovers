exports.app = require('./server/functions/app').app;
exports.createdUserAccount = require('./server/functions/app').createdUserAccount;
exports.deleteUserAccount = require('./server/functions/app').deleteUserAccount;
exports.onPostWrite = require('./server/functions/db').onPostWrite;
exports.countlikechange = require('./server/functions/db').countlikechange;
exports.recountlikes = require('./server/functions/db').recountlikes;