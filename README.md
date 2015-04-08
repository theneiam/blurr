Blurr
=====
[![Travis](https://travis-ci.org/theneiam/blurr.svg?branch=master)](https://travis-ci.org/theneiam/blurr)
[![Code Climate](https://codeclimate.com/github/theneiam/blurr/badges/gpa.svg)](https://codeclimate.com/github/theneiam/blurr)

**Blurr** - powerful routing manager middleware for [Express](https://github.com/strongloop/express)

**Blurr** supports modular application architecture, express router options, REST architecture and can be integrated to the project in a minute.

**Blurr** can be used as a main route manager or it can work along with another routing software (e.g. express native router)


## Installation

Install *Blurr* save it in the dependencies list:

```sh
$ npm install blurr --save
```

To install *Blurr* temporarily, and not add it to the dependencies list, omit the --save option:

```sh
$ npm install blurr
```

## Usage (Super Quick Start) 

*we assume that you already installed express and blurr*

Create the following directory structure

```sh
.
+-- app/
|   +-- controllers/
|   |   +-- index.js
+-- app.js   
+-- package.json

```
Edit app.js file

```js

// require minimum dependencies
var http = require('http'),
    express = require('express'),
    blurr   = require('blurr');

// create an application instance
var app = express();

// create minimal **Blurr** config 
var blurrConfig = {
    paths: {
        controllers: __dirname + '/app/controllers/'
    },
    resources: [
        {
            mount: '/',
            routes: {
                'get / index@index': []
            }
        }
    ]
};

// tell application to use **Blurr**
app.use(blurr(blurrConfig));

// start listening
http
    .createServer(app)
    .listen(5000, function() {
        console.log('Listening on port 5000');
    });

```

Edit app/controllers/index.js

```js
'use strict';

var IndexController = function() {

    return {
        index: function(req, res) {
            res.json({ message: 'Knock knock, Neo.' });
        }
    };
}

module.exports = new IndexController();

```

Run your application and curl (or visit) the http://localhost:5000/

```sh
node app.js
```

```sh
curl http://localhost:5000
```

## API

```js
var blurr = require('blurr');
```


#### Connect Blurr with Express

Create a new **Blurr** instance and make express use it 

```js
var express    = require('express'),
    blurr      = require('blurr');

    var app = express();
    app.use(blurr({ ... }));
```


#### Blurr configuration

First of all, let's see a **minimal** config example

```js
var blurrConfig = {
    
    paths: {
        controllers: '/path/to/controllers/directory/'
    },
    
    resources: [
        {
            mount: '/',
            routes: {
                'get / index@index': []
            }
        }
    ]
    
};
```

And here is a **full** config example

```js
var blurrConfiguration = {
    
    paths: {
        controllers: '/path/to/*/controllers/directory/',
        middleware: '/path/to/middleware/directory/'
    },
    
    resources: [
        {
            module : 'main'
            mount  : '/',
            routes : {
                'get / index@home': []
            }
        }
    ],
        
    strict               : false,
    caseSensitive        : false,
    mergeParams          : false,
    preferMountPathMatch : false
    
}
    
```


##### Blurr configuration: paths

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


#####  Blurr configuration: resources

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

##### Blurr configuration: Resource routes

Each resource route has 2 parts:
    * route config url
    * array with route specific middleware names

Route config url has following structure '{routeType} {routeUrl} {controller}@{action}'

**{routeType}** - get, post, put, delete, all

**{routeUrl}** - resource route url

**{controller}** - name of the controller file

**{action}** - action function that will handle a route

Array with middleware names - list of middleware that will be required for the specific route

```js
routes: {
    'get /message/:id messages@show': ['authenticated']
}
```

##### Blurr configuration: preferMountPathMatch

 This option allows **Blurr** to load resource only if its mount point match request path.
 This option is set to **false** by default.
 This behaviour is useful for application with a lot of resources, it will speed up loading and help to avoid of scanning of resources on each request


##### Blurr configuration: caseSensitive
See [Express router](http://expressjs.com/4x/api.html#router): *caseSensitive* option
    

##### Blurr configuration: mergeParams
See [Express router](http://expressjs.com/4x/api.html#router): *mergeParams* option
    
    
##### Blurr configuration: strict
See [Express router](http://expressjs.com/4x/api.html#router): *strict* option


##### Bonus: Simple controller example

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
