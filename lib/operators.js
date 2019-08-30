"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var keyHasType = function (type, key) {
    return type === key || typeof key === 'function' && type === key.toString();
};
exports.ofType = function () {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (source) { return source.pipe(operators_1.filter(function (_a) {
        var type = _a.type;
        var len = keys.length;
        if (len === 1) {
            return keyHasType(type, keys[0]);
        }
        else {
            for (var i = 0; i < len; i++) {
                if (keyHasType(type, keys[i])) {
                    return true;
                }
            }
        }
        return false;
    })); };
};
