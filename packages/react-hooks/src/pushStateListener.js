import { useEffect } from 'react';

const history = typeof window !== 'undefined' && window.history;
const pushState = history?.pushState;

// Listeners must be module-level because history is global.
let listeners = [];

const handlePushState = (event) => {
  // If a timeout is not used, window.location will not reflect the new location
  // in listeners.
  setTimeout(() => {
    listeners.forEach((current) => current.call(current, event));
  }, 0);
};

if (history) {
  // Reference: https://stackoverflow.com/a/4585031/83897
  window.addEventListener('popstate', handlePushState);
  history.onpushstate = handlePushState;
  history.pushState = (state, ...args) => {
    if (typeof history.onpushstate === 'function') {
      history.onpushstate({ state });
    }
    return pushState.apply(history, [state, ...args]);
  };
}

const usePushStateListener = (listener) => {
  useEffect(() => {
    if (!listener) {
      return;
    }

    listeners.push(listener);

    return () => {
      if (!listener) {
        return;
      }

      const index = listeners.findIndex((current) => current === listener);

      listeners = [...listeners.slice(0, index), ...listeners.slice(index + 1)];
    };
  }, [listener]);
};

export default usePushStateListener;
