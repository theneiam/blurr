/*!
 * Blurr - examples/simple/middleware/simple/index.js
 *
 * @author Eugene Nezhuta <eugene.nezhuta@gmail.com>
 * Copyright(c) 2015 Eugene Nezhuta
 * MIT Licensed
 */

/**
 * Simple demo middleware
 *
 * @type {Function}
 */
exports = module.exports = function(req, res, next) {
    req.blurrMessage = 'Blurr is saying ' + req.params.message + ' to you!';
    return next();
}