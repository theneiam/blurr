/*!
 * Blurr - examples/simple/controllers/index.js
 *
 * @author Eugene Nezhuta <eugene.nezhuta@gmail.com>
 * Copyright(c) 2015 Eugene Nezhuta
 * MIT Licensed
 */

'use strict';

/**
 * Super simple controller (required for tests)
 */
module.exports = {

    home: function (req, res) {
        res.sendStatus(200);
    },

    middleware: function (req, res) {
        res.send('Index controller, middleware action');
    },

    middlewareMessage: function (req, res) {
        res.status(200).send(req.blurrMessage);
    },

    jsonAction: function (req, res) {
        res.json({
            message: 'Blurr is saying hi!'
        });
    },

    inline: function (req, res) {
        res
            .status(200)
            .json({
                middlewareCount : req.middlewareCount
            });
    }
};