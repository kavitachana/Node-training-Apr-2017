const assert = require('chai').assert;
const Band = require('../app/band');

describe('Band', () => {
    it('should return a member count', () => {
      const band = new Band('The Beatles', ['John', 'Paul', 'George', 'Ringo']);
      assert.equal(4, band.memberCount());
    });

    it('contains a member', () => {
      const band = new Band('The Beatles', ['John', 'Paul', 'George', 'Ringo']);
      assert(band.hasMember('John'));
    });

    it('does not contain a member', () => {

      const band = new Band('The Beatles', ['John', 'Paul', 'George', 'Ringo']);
      assert.isFalse(band.hasMember('Jimi'));

    });
});
