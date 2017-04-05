const asyncFunc = require('../app/asyncFunc');
const assert = require('chai').assert;

describe('async', () => {
    it('run without an error', (done) => {
      asyncFunc(function() {
          done();
      })
    });
});
