exports.app = require('./server/functions/app').app;
exports.onPostWrite = require('./server/functions/db').onPostWrite;
exports.countlikechange = require('./server/functions/db').countlikechange;
exports.recountlikes = require('./server/functions/db').recountlikes;