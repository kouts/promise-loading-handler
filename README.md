# promise-loading-handler <a href="https://npm.im/promise-loading-handler"><img src="https://badgen.net/npm/v/promise-loading-handler"></a> ![](https://img.badgesize.io/promise-loading-handler/dist/promise-loading-handler.umd.js.svg) ![](https://img.badgesize.io/promise-loading-handler/dist/promise-loading-handler.umd.js.svg?compression=gzip)

A simple, reusable loading handler function for `Promises` that will make sure the loading indicator in JS apps will disappear only when the last unresolved `Promise` gets resolved.  
Created to solve the "flickering" issue that occurs when multiple requests are triggering the start of the loading progress.

<img src="/.github/loading-indicator-flicker.gif" width="100%">

## Setup

```bash
npm i promise-loading-handler
```

## Usage

`promise-loading-handler` exposes a `createLoader` factory function that takes an options object as a parameter. The options object defines which operations will be performed on loading start/end and optionally an operation to execute when a `Promise` is resolved.

We can also define a `slackTime` that will be used as a delay to wait until the last Promise is resolved. This is useful in cases that we have e.g an API call that starts shortly after another call has just finished, causing a "flickering" effect in our loader.

The factory function will return a `load` method which will accept a `Promise` or a `function` that returns a `Promise`. Instead of firing our `async` functions directly, we'll pass them through the `load` function instead. The loader then will make sure that the loading progress ends when the last of the `Promises` is resolved.

### Example using [nprogress](https://github.com/rstacruz/nprogress) as the progress loading indicator.

Create the loader
`loader.js`
```js
import NProgress from 'nprogress';
import { createLoader } from 'promise-loading-handler';

NProgress.configure({
  minimum: 0.35,
  speed: 300,
});

const start = () => {
  NProgress.start();
};

const end = () => {
  NProgress.done();
};

const inc = () => {
  NProgress.inc(0.05);
};

const loader = createLoader({ start, end, slackTime: 350, inc });

export const { load } = loader;

```

Use the loader
```js
import { load } from './loader';
import axios from 'axios';

const res1 = load(axios.get(`https://jsonplaceholder.typicode.com/todos`));
const res2 = load(axios.get(`https://jsonplaceholder.typicode.com/todos/1`));

```

## Options
Option  | Description | Type | Default
--------|-------------|------|--------
`start` | A function to execute on loading start, this is where we start our progress loader  | `function` | `undefined`
`end` | A function to execute when loading ends, this is where we stop our progress loader | `function` | `undefined`
`inc` | An optional function to execute when a promise resolves (valid for all promises except the last one). We can use this function to increment our loading progress.  | `function` | `() => {}`
`slackTime` | Time in `ms` to wait until last promise is resolved as to enable multiple operations in a sequence without re-triggering a loader progress start | `Number` | `0`


## Browsers support
`promise-loading-handler` works in all browsers that support `Promise` (either natively or [polyfilled](https://github.com/taylorhakes/promise-polyfill)).