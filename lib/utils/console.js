"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deprecationsSeen = {};
exports.resetDeprecationsSeen = function () {
    deprecationsSeen = {};
};
var consoleWarn = (typeof console === 'object' && typeof console.warn === 'function')
    ? function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return console.warn.apply(console, args);
    }
    : function () { };
exports.deprecate = function (msg) {
    if (!deprecationsSeen[msg]) {
        deprecationsSeen[msg] = true;
        consoleWarn("redux-observable | DEPRECATION: " + msg);
    }
};
exports.warn = function (msg) {
    consoleWarn("redux-observable | WARNING: " + msg);
};
