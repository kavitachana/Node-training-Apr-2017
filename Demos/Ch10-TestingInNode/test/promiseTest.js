const promiseFunc = require('../app/promiseFunc');
const chai = require('chai');
const assert = chai.assert;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('promise', () => {
    it('run without an error', () => {
      assert.eventually.equal(promiseFunc(), 100);
    });
});

