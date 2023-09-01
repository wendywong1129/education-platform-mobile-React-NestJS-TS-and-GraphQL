import { useEffect } from 'react';
import useLatest from './useLatest';

/**
 * @param fn
 */
const useUnmount = (fn: () => void) => {
  // useEffect(() => {
  //   return fn?.();
  // }, []);
  // useEffect(() => () => fn?.(), []);

  // const fnRef = useRef(fn);
  // fnRef.current = fn;
  const fnRef = useLatest(fn);

  useEffect(() => () => fnRef.current(), []);
};

export default useUnmount;
