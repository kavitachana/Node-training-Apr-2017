module.exports = function(callback) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            const expectedValue = 100;   
            resolve(expectedValue);
        },
        1000);
    });
};