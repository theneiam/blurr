
var assert  = require('assert'),
    request = require('supertest'),
    blurr   = require('..');

describe('blurr() test suits', function() {

    describe('Basic operations', function() {

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

});
