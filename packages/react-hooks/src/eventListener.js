import { useEffect } from 'react';

const useEventListener = (event, listener, options, context = document) => {
  useEffect(() => {
    if (context.addEventListener) {
      context.addEventListener(event, listener, options);
    } else if (context.attachEvent) {
      context.attachEvent(event, listener);
    }

    return () => {
      if (context.removeEventListener) {
        context.removeEventListener(event, listener, options);
      } else if (context.detachEvent) {
        context.detachEvent(event, listener);
      }
    };
  }, [event, listener, options, context]);
};

export default useEventListener;
