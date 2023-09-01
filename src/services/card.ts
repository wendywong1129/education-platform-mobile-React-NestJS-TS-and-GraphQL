import { useQuery } from '@apollo/client';
import { GET_CARDS, GET_USE_CARDS } from '@/graphql/card';
import { TCardRecordsQuery } from '@/utils/types';

export const useCards = () => {
  const { loading, data } = useQuery<TCardRecordsQuery>(GET_CARDS, {
    variables: {
      page: {
        pageSize: 100,
        pageNum: 1,
      },
    },
  });

  return {
    loading,
    data: data?.getCardRecordsForH5.data,
  };
};

export const useUseCards = (courseId: string) => {
  const { loading, data } = useQuery<TCardRecordsQuery>(GET_USE_CARDS, {
    variables: {
      courseId,
    },
  });

  return {
    loading,
    data: data?.getUseCardRecordsByCourse.data,
  };
};
