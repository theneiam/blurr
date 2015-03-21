
var assert  = require('assert'),
    request = require('supertest'),
    prowl   = require('..');

describe('prowl() test suits', function() {

    describe('Basic operations', function() {

        it('should require config', function() {
            assert.throws(prowl.bind(), /configuration required/);
        });

        it('should require configuration as object', function() {
            assert.throws(prowl.bind(prowl, 'string'), /configuration should be an object/);
        });

        it('should require config paths', function() {
            assert.throws(prowl.bind(prowl, {}), /configuration paths required/);
        });

        it('should require config paths controllers', function() {
            assert.throws(prowl.bind(prowl, { paths: {} }), /configuration paths controllers required/);
        });

        it('should require config resources', function() {
            assert.throws(prowl.bind(prowl, { paths: {} }), /configuration paths controllers required/);
        });

    });

});
