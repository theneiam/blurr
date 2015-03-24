
var expect  = require('chai').expect,
    request = require('supertest'),
    blurr   = require('..'),
    app     = require('../examples/simple/app');

describe('blurr() test suits', function() {

    describe('Create Blurr instance', function() {

        it('should require config', function() {
            expect(blurr.bind()).to.throw(TypeError, /configuration required/);
        });

        it('should require configuration as object', function() {
            expect(blurr.bind(blurr, 'string')).to.throw(TypeError, /configuration should be an object/);
        });

        it('should require config paths', function() {
            expect(blurr.bind(blurr, {})).to.throw(TypeError, /onfiguration paths required/);
        });

        it('should require config paths controllers', function() {
            expect(blurr.bind(blurr, { paths: {} })).to.throw(TypeError, /configuration paths controllers required/);
        });

        it('should require config resources', function() {
            expect(blurr.bind(blurr, { paths: { controllers: '/path/to/controllers/' } }))
                .to.throw(TypeError, /configuration resources required/);
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
