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
var isEs6Class = function(cls) {
    return String(cls).indexOf('class') === 0;
}
var StateObservable = /** @class */ (function (_super) {
    __extends(StateObservable, _super);
    function StateObservable(stateSubject, initialState) {
        function __observer(subscriber) {
            var subscription = _this.__notifier.subscribe(subscriber);
            if (subscription && !subscription.closed) {
                subscriber.next(_this.value);
            }
            return subscription;
        }
        var _this = isEs6Class(_super) ? new _super(__observer) : _super.call(this, __observer) || this;
        _this.value = initialState;
        _this.__notifier = new rxjs_1.Subject();
        _this.__subscription = stateSubject.subscribe(function (value) {
            // We only want to update state$ if it has actually changed since
            // redux requires reducers use immutability patterns.
            // This is basically what distinctUntilChanged() does but it's so simple
            // we don't need to pull that code in
            if (value !== _this.value) {
                _this.value = value;
                _this.__notifier.next(value);
            }
        });
        return _this;
    }
    return StateObservable;
}(rxjs_1.Observable));
exports.StateObservable = StateObservable;
