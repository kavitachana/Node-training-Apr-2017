function Concert(venueCapacity, ticketsSold) {
  this.venueCapacity = venueCapacity;
  this.ticketsSold = ticketsSold;
}

Concert.prototype.isSoldOut = function() {
  return this.ticketsSold >= this.venueCapacity();
}

module.exports = Concert;