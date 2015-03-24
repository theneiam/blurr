
var assert  = require('assert'),
    request = require('supertest'),
    blurr   = require('..'),
    app     = require('../examples/simple/app');

describe('blurr() test suits', function() {

    describe('Create Blurr instance', function() {

        it('should require config', function() {
            assert.throws(blurr.bind(), /configuration required/);
        });

        it('should require configuration as object', function() {
            assert.throws(blurr.bind(blurr, 'string'), /configuration should be an object/);
        });

        it('should require config paths', function() {
            assert.throws(blurr.bind(blurr, {}), /configuration paths required/);
        });

        it('should require config paths controllers', function() {
            assert.throws(blurr.bind(blurr, { paths: {} }), /configuration paths controllers required/);
        });

        it('should require config resources', function() {
            assert.throws(blurr.bind(blurr, { paths: {} }), /configuration paths controllers required/);
        });

    });

    describe('Using Blurr in application', function() {

        it('should GET / => index@home with response status 200', function(done) {
            request(app)
                .get('/')
                .expect(200, done);
        });

        it('should GET /middleware => index@middleware', function(done) {
            request(app)
                .get('/middleware')
                .expect('Index controller, middleware action')
                .expect(200, done);
        });

        it('should GET /middleware/:message and load simple middleware', function(done) {
            request(app)
                .get('/middleware/hello')
                .expect('Blurr is saying hello to you!')
                .expect(200, done);
        });

        it('should GET /json and respond with json', function(done) {
            request(app)
                .get('/json')
                .expect('Content-Type', /json/)
                .expect({message: 'Blurr is saying hi!'})
                .expect(200, done);
        });
    });

});
