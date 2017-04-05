const assert = require('chai').assert;

describe('assertions', () => {

    // See http://chaijs.com/api/assert/ for a the full API

    it('is true', () => {
      assert(true);
    });

    it('is false', () => {
      assert.isFalse(false);
    });

    it('is 42', () => {
      const value = 42;
      assert.equal(42, value);
    });

    it('is not 42', () => {
      const value = 42;
      assert.notEqual(0, value);
    });

    it('is not null', () => {
      const iAmNotNull = 'foo'; 
      assert.isNotNull(iAmNotNull);
    });

    it('is null', () => {
      const iAmNull = null; 
      assert.isNull(iAmNull);
    });
});
