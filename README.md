Blurr
=====
[![Travis](https://travis-ci.org/theneiam/blurr.svg?branch=master)](https://travis-ci.org/theneiam/blurr)
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

    preferMountPathMatch: true,

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

##### Config preferMountPathMatch

 *preferMountPathMatch* option allows Blurr to load resource only if its mount point match request path.
 This option is set to *true* by default.
 This behaviour is useful for application with a lot of resources it will speed up loading and help to avoid of scanning of resources on each request

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

## License

(The MIT License)

Copyright (c) 2015 <eugene.nezhuta@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
