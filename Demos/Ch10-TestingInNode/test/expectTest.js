const expect = require('chai').expect;

describe('expect', () => {

    // See http://chaijs.com/api/bdd/ for a the full API

    it('is true', () => {
      const truth = true;
      expect(truth).to.be.true;
    });

    it('is false', () => {
      const lies = false;
      expect(lies).to.be.false;
    });

    it('is 42', () => {
      const theAnswer = 42;
      expect(theAnswer).to.equal(42);
    });

    it('is not 42', () => {
      const notTheAnswer = 0;
      expect(notTheAnswer).to.not.equal(42);
    });

    it('is not null', () => {
      const iAmNotNull = 'foo'; 
      expect(iAmNotNull).to.not.be.null;
    });

    it('is null', () => {
      const iAmNull = null; 
      expect(iAmNull).to.be.null; // can't call properties on null
    });
});
