let lib = {};

lib.load = function (first, second) {
    for (let key in second) {
        first[key] = second[key];
    }
    return first;
};

module.exports = lib;
