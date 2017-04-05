const Ticket = require('../app/ticket');
const assert = require('chai').assert;
const sinon = require('sinon');

describe('mocks', () => {
    it('has called a callback', () => {
        const purchaseAmount = 100;
        const mockPaymentGateway = { authorizePurchase: function () {} };
        const mock = sinon.mock(mockPaymentGateway);
        mock.expects("authorizePurchase").once().withArgs(purchaseAmount);

        const ticket = new Ticket(purchaseAmount, mockPaymentGateway);
        ticket.purchase();

        mock.verify();
    });
});
