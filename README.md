Blurr
=====
[![Travis](https://travis-ci.org/theneiam/blurr.svg?branch=master)](https://travis-ci.org/theneiam/blurr.svg?branch=master)
[![Code Climate](https://codeclimate.com/github/theneiam/blurr/badges/gpa.svg)](https://codeclimate.com/github/theneiam/blurr)

Blurr - powerful routing manager middleware for [Express](https://github.com/strongloop/express)

## Install

```sh
$ npm install blurr
```

## API

```js
var blurr = require('blurr');
```

### blurr(config)

Create a new blurr router middleware instance

#### Useage

```js
var express    = require('express'),
    blurr      = require('blurr');

    // blur router configuration
    var config = {
        paths: {
            controllers: '/path/to/controllers/directory/',
            middleware: '/path/to/middleware/directory/'
        },
        resources: [
            {
                mount: '/',
                routes: {
                    'get / index@home': []
                }
            }
        ]
    }

    var app = express();
    app.use(blurr(config));

```

#### Config

Basic blurr config object expects to have:
  * *paths* object with path to *controllers* (required) and *middleware* (optional) directories.
  * *resources* array with at lease one resource configured

```js
var config = {

    paths: {
        controllers: '/path/to/controllers/directory/',
        middleware: '/path/to/middleware/directory/'
    },

    resources: [
        {
            mount: '/',
            routes: {
                'get / index@index': [],
                'get /hello/:name index@sayHello': []
            }
        }
    ]
}
```

##### Config paths

Paths object should contain *controllers* property with path to controllers directory. Optionally it may contain *middleware*
property with path to the directory with middleware, **blurr** will try to load middleware (if specified) for your resource routes from that directory

```js
paths: {
    controllers: '/path/to/controllers/directory/',
    middleware: '/path/to/middleware/directory/'
}
```

If your application has a modular structure and each module has its own controllers, you can specify a wildcard in controllers path
and **blurr** will automatically resolve it to correct path using resource *module* option

```js
    paths: {
        controllers: '/path/to/modular/*/controllers/directory/',
        middleware: '/path/to/middleware/directory/'
    }

    {
        module: 'messaging',
        mount: '/messages',
        routes: {
            'get / messages@all': []
        }
    }
```

In the example above, the final path to controller will be */path/to/modular/messaging/controllers/directory/*

##### Config resources

Resource is an object that should include *mount* point to mount a resource to the express and *routes* abject, that contains
resource related routes

```js
{
    mount: '/',
    routes: {
        'get / index@index': [],
        'get /hello/:name index@sayHello': []
    }
}
```

Also resource can contain *module* option if your application has modular structure (see example bellow)

#### Resource routes

Each resource route has 2 parts:
    * route config url
    * array with route specific middleware names

Route config url has following structure '{routeType} {routeUrl} {controller}@{action}'

{routeType} - get, post, put, delete
{routeUrl} - resource route url
{controller} - name of the controller file
{action} - action function that will handle a route

Array with middleware names - list of middleware that will be required for the specific route

```js
routes: {
    'get /message/:id messages@show': ['authenticated']
}
```

#### Simple controller example

Just a simple controller example, but you can use all your imagination :)

```js
module.exports = {
     show: function(req, res) {
         var massageId = req.params.id;
         res.json({
             text: 'Hello kitty',
             id: messageId
         });
     }
 };
```