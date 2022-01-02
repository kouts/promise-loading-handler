var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const createLoader = (options) => {
  const promises = [];
  const opts = __spreadValues(__spreadValues({}, {
    inc: () => {
    },
    slackTime: 0
  }), options);
  const load = (promise) => {
    const p = typeof promise === "function" ? promise() : promise;
    !promises.length && opts.start();
    promises.push(p);
    p.finally(() => {
      setTimeout(() => {
        promises.pop();
        !promises.length ? opts.end() : opts.inc();
      }, opts.slackTime);
    });
    return p;
  };
  return { load };
};
export { createLoader };
