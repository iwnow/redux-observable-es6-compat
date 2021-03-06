"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
/**
  Merges all epics into a single one.
 */
exports.combineEpics = function () {
    var epics = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        epics[_i] = arguments[_i];
    }
    var merger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return rxjs_1.merge.apply(void 0, epics.map(function (epic) {
            var output$ = epic.apply(void 0, args);
            if (!output$) {
                throw new TypeError("combineEpics: one of the provided Epics \"" + (epic.name || '<anonymous>') + "\" does not return a stream. Double check you're not missing a return statement!");
            }
            return output$;
        }));
    };
    // Technically the `name` property on Function's are supposed to be read-only.
    // While some JS runtimes allow it anyway (so this is useful in debugging)
    // some actually throw an exception when you attempt to do so.
    try {
        Object.defineProperty(merger, 'name', {
            value: "combineEpics(" + epics.map(function (epic) { return epic.name || '<anonymous>'; }).join(', ') + ")",
        });
    }
    catch (e) { }
    return merger;
};
