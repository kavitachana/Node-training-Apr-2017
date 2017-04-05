function Ticket(purchaseAmount, paymentGateway) {
  this.purchaseAmount = purchaseAmount;
  this.paymentGateway = paymentGateway;
}

Ticket.prototype.purchase = function() {
  this.paymentGateway.authorizePurchase(this.purchaseAmount);
}

module.exports = Ticket;