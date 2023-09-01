import { useCallback, useState } from 'react';
import useMount from './useMount';

interface IOptions {
  params?: Record<string, string>;
  manual?: boolean;
  onSuccess?: (res: unknown) => void;
  onError?: (err: unknown) => void;
}

const useRequest = (
  service: (params: Record<string, string>) => Promise<unknown>,
  options: IOptions,
) => {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>();

  const init = useCallback(
    (curParams: Record<string, string>) => {
      setLoading(true);
      return service(curParams)
        .then((res) => {
          setData(res);
          setLoading(false);
          // options.onSuccess && options.onSuccess(res)
          if (options.onSuccess) {
            options.onSuccess(res);
          }
        })
        .catch((error) => {
          setLoading(false);
          // options.onError && options.onError(error)
          if (options.onError) {
            options.onError(error);
          }
        });
    },
    [service],
  );

  useMount(() => {
    if (!options.manual) {
      init(options.params || {});
    }
  });

  // const run = (runParams: Record<string, string>) => {
  //   return init(runParams);
  // };
  const run = (runParams: Record<string, string>) => init(runParams);

  // return [loading, data, run];
  return { loading, data, run };
};

export default useRequest;
