this is fix for package redux-observable in es2015 target build
related to: https://www.npmjs.com/package/redux-observable

issue createStore redux with redux-observable middleware in angular project target to ES6

```
Error
ActionsObservable.js:30 Uncaught TypeError: Class constructor Observable cannot be invoked without 'new'
    at new ActionsObservable (ActionsObservable.js:30)
    at epicMiddleware (createEpicMiddleware.js:24)
    at redux.js:615
```

That error fixed in package [redux-observable-es6-compat](https://www.npmjs.com/package/redux-observable-es6-compat) <b>only for redux-observable version 1.0.0</b>

instead of
```js
import { createEpicMiddleware } from 'redux-observable';
```
use this
```js
import { createEpicMiddleware } from 'redux-observable-es6-compat';
```

and it works for es5 and es2015 target build