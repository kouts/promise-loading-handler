export const createLoader = (options: {
  start: () => void;
  end: () => void;
  inc?: () => void;
  slackTime?: number;
}) => {
  const promises: Promise<unknown>[] = [];

  const opts = {
    ...{
      inc: () => {},
      slackTime: 0,
    },
    ...options,
  };

  const load = <T>(promise: Promise<T> | (() => Promise<T>)) => {
    const p = typeof promise === 'function' ? promise() : promise;

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
