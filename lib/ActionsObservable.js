"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("./operators");
var isEs6Class = function(cls) {
    return String(cls).indexOf('class') === 0;
}
var ActionsObservable = /** @class */ (function (_super) {
    __extends(ActionsObservable, _super);
    function ActionsObservable(actionsSubject) {
        var _this =isEs6Class(_super) ? new _super() :  _super.call(this) || this;
        _this.source = actionsSubject;
        return _this;
    }
    ActionsObservable.of = function () {
        var actions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actions[_i] = arguments[_i];
        }
        return new this(rxjs_1.of.apply(void 0, actions));
    };
    ActionsObservable.from = function (actions, scheduler) {
        return new this(rxjs_1.from(actions, scheduler));
    };
    ActionsObservable.prototype.lift = function (operator) {
        var observable = new ActionsObservable(this);
        observable.operator = operator;
        return observable;
    };
    ActionsObservable.prototype.ofType = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return operators_1.ofType.apply(void 0, keys)(this);
    };
    return ActionsObservable;
}(rxjs_1.Observable));
exports.ActionsObservable = ActionsObservable;
