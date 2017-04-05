function Band(name, members) {
  this.name = name;
  this.members = members;
}

Band.prototype.memberCount = function() {
  return this.members.length;
}

Band.prototype.hasMember = function(name) {
  return this.members.includes(name);
}

module.exports = Band;
