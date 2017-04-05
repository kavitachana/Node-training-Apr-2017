const Concert = require('../app/concert');
const assert = require('chai').assert;
const sinon = require('sinon');

describe('concert', () => {
    it('is not sold out', () => {
        const venueCapacityStub = sinon.stub();
        venueCapacityStub.returns(1000)

        const concert = new Concert(venueCapacityStub, 800);

        assert.isFalse(concert.isSoldOut());
    });
});
