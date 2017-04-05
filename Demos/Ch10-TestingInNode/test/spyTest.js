const spyOnMe = require('../app/spyOnMe');
const assert = require('chai').assert;
const sinon = require('sinon');

describe('spies', () => {
    it('has called a callback', () => {
        const spyCallback = sinon.spy();
        
        spyOnMe(spyCallback);

        assert.isTrue(spyCallback.calledOnce);
    });
});
