import _ from 'lodash';
import { useEffect, useState } from 'react';

const OFFSET = 90;

export const useDownLoad = ({
  hasMore = false,
  loadMore = () => {},
}) => {
  const [tips, setTips] = useState('');

  useEffect(() => {
    window.onscroll = _.debounce(async () => {
      const { clientHeight, scrollTop } = document.documentElement;

      const { scrollHeight } = document.body;

      if (hasMore && (scrollTop + clientHeight >= scrollHeight - OFFSET)) {
        setTips('Loading...');

        await loadMore();

        setTips('Loaded successfully');

        setTimeout(() => {
          setTips('');
        }, 1000);
      }
    }, 500);

    return () => {
      window.onscroll = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore]);

  return { tips };
};
