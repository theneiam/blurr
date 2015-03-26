/*!
 * Blurr - powerful routing manager middleware for Express
 *
 * @author Eugene Nezhuta <eugene.nezhuta@gmail.com>
 * Copyright(c) 2015 Eugene Nezhuta
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 */

var express = require('express');

/**
 * @param {Object} config
 * @return {Function}
 */
module.exports = function blurr(config) {

    if (!config) {
        throw new TypeError('configuration required');
    }

    if (typeof config !== 'object') {
        throw new TypeError('configuration should be an object');
    }

    if (!config.paths) {
        throw new TypeError('configuration paths required');
    }

    if (!config.paths.controllers) {
        throw new TypeError('configuration paths controllers required');
    }

    if (!config.resources) {
        throw new TypeError('configuration resources required');
    }

    return function blurr(req, res, next) {

        // iterate through resources and register proper routes
        config.resources.forEach(function (resource) {

            // each resource use its own instance of the express router
            var router = express.Router(),

                // try to get resource module name, if modular structure is used
                module = resource.module || '',

                // path to controllers considering module
                controllersPath = config.paths.controllers.replace('*', module),

                // current route url with configuration
                urlConfig,

                // route meta information after parsing route config url
                routeMeta,

                // controller to handle the specific route
                controller,

                // list of middleware that required for current route
                middleware;

            for (urlConfig in resource.routes) {

                if (resource.routes.hasOwnProperty(urlConfig)) {

                    // parse resource route url and get all route meta information
                    routeMeta = parseResourceUrlConfig(urlConfig);

                    // require controller to handle the reques
                    controller = require(controllersPath + routeMeta.controller);

                    // load route related middleware
                    middleware = loadResourceRouteMiddleware(config.paths.middleware, resource.routes[urlConfig]);

                    // register resource route
                    router[routeMeta.type](routeMeta.url, middleware, controller[routeMeta.action]);

                }
            }

            // mount router to the application into the mount point specified by resource
            req.app.use(resource.mount, router);

        });

        return next();
    };
};

/**
 * Parse resource 'url config' and prepare an object with request type, route url cntroller and action
 *
 * @param {String} urlConfig e.g 'get /:name users/hello'
 * @returns {{type: *, url: *, controller: *, action: *}}
 * @private
 */
var parseResourceUrlConfig = function (urlConfig) {
    var splitUrlConfig = urlConfig.split(' ');

    return {
        'type'       : splitUrlConfig[0],
        'url'        : splitUrlConfig[1],
        'controller' : splitUrlConfig[2].split('@')[0],
        'action'     : splitUrlConfig[2].split('@')[1]
    };
};

/**
 * Locate and require route-specific middleware, if needed
 *
 * @param {String} middlewarePath
 * @param {Array} middleware
 * @returns {Array} List of middleware ready to be injected into the route
 * @private
 */
var loadResourceRouteMiddleware = function (middlewarePath, middleware) {

    if (!middleware) {
        return [];
    }

    return middleware.map(function (middlewareItem) {

        if (typeof middlewareItem === 'function') {
            return middlewareItem;
        }

        return require(middlewarePath + middlewareItem);
    });
};
