import { useEffect } from 'react';

/**
 * @param fn
 */
const useMount = (fn: () => void) => {
  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
