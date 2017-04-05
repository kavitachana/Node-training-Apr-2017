module.exports = function(callback) {
    setTimeout(function() {
      callback();
    }, 1000);

}