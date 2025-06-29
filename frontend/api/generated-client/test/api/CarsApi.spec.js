/**
 * GasFein API
 * This is the official API of GasFein
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.GasFeinApi);
  }
}(this, function(expect, GasFeinApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new GasFeinApi.CarsApi();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('CarsApi', function() {
    describe('usersUserIdCarsCarIdDelete', function() {
      it('should call usersUserIdCarsCarIdDelete successfully', function(done) {
        //uncomment below and update the code to test usersUserIdCarsCarIdDelete
        //instance.usersUserIdCarsCarIdDelete(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('usersUserIdCarsGet', function() {
      it('should call usersUserIdCarsGet successfully', function(done) {
        //uncomment below and update the code to test usersUserIdCarsGet
        //instance.usersUserIdCarsGet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('usersUserIdCarsPost', function() {
      it('should call usersUserIdCarsPost successfully', function(done) {
        //uncomment below and update the code to test usersUserIdCarsPost
        //instance.usersUserIdCarsPost(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
