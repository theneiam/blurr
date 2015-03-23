Blurr
=====
[![Travis](https://travis-ci.org/theneiam/blurr.svg?branch=master)](https://travis-ci.org/theneiam/blurr.svg?branch=master)
[![Code Climate](https://codeclimate.com/github/theneiam/blurr/badges/gpa.svg)](https://codeclimate.com/github/theneiam/blurr)

Blurr - powerful routing manager middleware for [Express](https://github.com/strongloop/express)

## Install

```sh
$ npm install prowl
```

## API

```js
var prowl = require('prowl')
```

### prowl(config)

Create a new middleware function ....

#### Config

```js
var config = {

    paths: {
        controllers: '/path/to/controllers/directory/',
        middlewares: '/path/to/middleware/directory/'
    },

    resources: [
        {
            mount: '/',
            routes: {
                'get / index@index': []
            }
        },

        {
            mount: '/messages',
            routes: {
                'get / messages@all': []
            }
        }
    ]

}
```

##### paths

```js
paths: {
    controllers: '/path/to/controllers/directory/',
    middlewares: '/path/to/middleware/directory/'
}
```

Paths option explanation

##### resources

```js
resources: [
    {
        mount: '/',
        routes: {
            'get / index@index': []
        }
    }
]
```

resources option explanation
