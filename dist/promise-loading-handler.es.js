const a = (c) => {
  const t = [], n = {
    inc: () => {
    },
    slackTime: 0,
    ...c
  };
  return { load: (e) => {
    const o = typeof e == "function" ? e() : e;
    return !t.length && n.start(), t.push(o), o.finally(() => {
      setTimeout(() => {
        t.pop(), t.length ? n.inc() : n.end();
      }, n.slackTime);
    }), o;
  } };
};
export {
  a as createLoader
};
