import { useEffect } from 'react';

const useInterval = (callback, seconds) => {
  useEffect(() => {
    const interval = setInterval(callback, seconds * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [callback, seconds]);
};

export default useInterval;
