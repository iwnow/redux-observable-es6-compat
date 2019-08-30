"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ActionsObservable_1 = require("./ActionsObservable");
var StateObservable_1 = require("./StateObservable");
function createEpicMiddleware(options) {
    if (options === void 0) { options = {}; }
    if (process.env.NODE_ENV !== 'production' && typeof options === 'function') {
        throw new TypeError('Providing your root Epic to `createEpicMiddleware(rootEpic)` is no longer supported, instead use `epicMiddleware.run(rootEpic)`\n\nLearn more: https://redux-observable.js.org/MIGRATION.html#setting-up-the-middleware');
    }
    var epic$ = new rxjs_1.Subject();
    var store;
    var epicMiddleware = function (_store) {
        if (process.env.NODE_ENV !== 'production' && store) {
            // https://github.com/redux-observable/redux-observable/issues/389
            require('./utils/console').warn('this middleware is already associated with a store. createEpicMiddleware should be called for every store.\n\nLearn more: https://goo.gl/2GQ7Da');
        }
        store = _store;
        var actionSubject$ = new rxjs_1.Subject().pipe(operators_1.observeOn(rxjs_1.queueScheduler));
        var stateSubject$ = new rxjs_1.Subject().pipe(operators_1.observeOn(rxjs_1.queueScheduler));
        var action$ = new ActionsObservable_1.ActionsObservable(actionSubject$);
        var state$ = new StateObservable_1.StateObservable(stateSubject$, store.getState());
        var result$ = epic$.pipe(operators_1.map(function (epic) {
            var output$ = 'dependencies' in options
                ? epic(action$, state$, options.dependencies)
                : epic(action$, state$);
            if (!output$) {
                throw new TypeError("Your root Epic \"" + (epic.name || '<anonymous>') + "\" does not return a stream. Double check you're not missing a return statement!");
            }
            return output$;
        }), operators_1.mergeMap(function (output$) {
            return rxjs_1.from(output$).pipe(operators_1.subscribeOn(rxjs_1.queueScheduler), operators_1.observeOn(rxjs_1.queueScheduler));
        }));
        result$.subscribe(store.dispatch);
        return function (next) {
            return function (action) {
                // Downstream middleware gets the action first,
                // which includes their reducers, so state is
                // updated before epics receive the action
                var result = next(action);
                // It's important to update the state$ before we emit
                // the action because otherwise it would be stale
                stateSubject$.next(store.getState());
                actionSubject$.next(action);
                return result;
            };
        };
    };
    epicMiddleware.run = function (rootEpic) {
        if (process.env.NODE_ENV !== 'production' && !store) {
            require('./utils/console').warn('epicMiddleware.run(rootEpic) called before the middleware has been setup by redux. Provide the epicMiddleware instance to createStore() first.');
        }
        epic$.next(rootEpic);
    };
    return epicMiddleware;
}
exports.createEpicMiddleware = createEpicMiddleware;
