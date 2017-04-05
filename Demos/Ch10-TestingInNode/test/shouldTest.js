require('chai').should();
const expect = require('chai').expect;

describe('should', () => {

    // See http://chaijs.com/api/bdd/ for a the full API

    it('is true', () => {
      const truth = true;
      truth.should.be.true;
    });

    it('is false', () => {
      const lies = false;
      lies.should.be.false;
    });

    it('is 42', () => {
      const theAnswer = 42;
      theAnswer.should.equal(42);
    });

    it('is not 42', () => {
      const notTheAnswer = 0;
      notTheAnswer.should.not.equal(42);
    });

    it('is not null', () => {
      const iAmNotNull = 'foo'; 
      iAmNotNull.should.not.be.null;
    });

    it('is null', () => {
      const iAmNull = null; 
      expect(iAmNull).to.be.null; // can't call properties on null
    });
});
