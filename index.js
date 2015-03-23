/*!
 * Blurr - powerful routing manager middleware for Express
 *
 * @author Eugene Nezhuta <eugene.nezhuta@gmail.com>
 * Copyright(c) 2015 Eugene Nezhuta
 * MIT Licensed
 */

/**
 * Module dependencies
 */

var express = require('express');

/**
 * @param {Object} config
 * @return {Function}
 */
exports = module.exports = function blurr(config) {

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
        config.resources.forEach(function(resource, index) {

            // each resource use its own instance of the express router
            var router = express.Router();

            for (var urlConfig in resource.routes) {

                // parse resource route url and get all route meta information
                var routeMeta = parseResourceUrlConfig(urlConfig)

                // try to get resource module name, if modular structure is used
                var module = resource.module || '';

                // path to controllers considering module
                var controllersPath = config.paths.controllers.replace('*', module);

                // require controller to handle the request
                var controller = require(controllersPath + routeMeta['controller']);

                // load route related middleware
                var middleware = loadResourceRouteMiddleware(resource.routes[urlConfig]);

                // register resource route
                router[routeMeta['type']](routeMeta['url'], middleware, controller[routeMeta['action']]);
            }

            // mount router to the application into the mount point specified by resource
            req.app.use(resource.mount, router);

        });

        return next();
    }
};

/**
 * Parse resource 'url config' and prepare an object with request type, route url cntroller and action
 *
 * @param {String} urlConfig e.g 'get /:name users/hello'
 * @returns {{type: *, url: *, controller: *, action: *}}
 * @private
 */
var parseResourceUrlConfig = function(urlConfig) {
    var splitUrlConfig = urlConfig.split(' ');

    return {
        'type'       : splitUrlConfig[0],
        'url'        : splitUrlConfig[1],
        'controller' : splitUrlConfig[2].split('@')[0],
        'action'     : splitUrlConfig[2].split('@')[1]
    }
};

/**
 * Locate and require route-specific middleware, if needed
 *
 * @param {Array} middlewareNames
 * @returns {Array} List of middleware ready to be injected into the route
 * @private
 */
var loadResourceRouteMiddleware = function(middlewareNames) {

    if (!middlewareNames) {
        return [];
    }

    return middlewareNames.map(function(name) {
        return require(config.paths.middlewares + name);
    });
}