/*!
 * Blurr - examples/simple/app.js
 *
 * @author Eugene Nezhuta <eugene.nezhuta@gmail.com>
 * Copyright(c) 2015 Eugene Nezhuta
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */
var express    = require('express'),
    blurr      = require('../../index');

/**
 * Blurr router simple configuration
 */

var config = {
    paths: {
        controllers: __dirname + '/controllers/',
        middleware: __dirname + '/middleware/'
    },
    resources: [
        {
            mount: '/',
            routes: {
                'get / index@home': [],
                'get /middleware index@middleware':[],
                'get /middleware/:message index@middlewareMessage':['simple'],
                'get /json index@jsonAction': []
            }
        }
    ]
}


var app = express();

/**
 * Register blurr middleware
 */
app.use(blurr(config));


module.exports = app;