import { useMutation, useQuery } from '@apollo/client';
import {
  TBaseQuery, TOrgsQuery, TScheduleRecordsQuery, TSchedulesQuery,
} from '@/utils/types';
import {
  CANCEL_SUBSCRIBE,
  GET_CAN_SUBSCRIBE_COURSES, GET_SCHEDULES_BY_COURSE, GET_SCHEDULE_RECORD, SUBSCRIBE_COURSE,
} from '@/graphql/schedule';

export const useCanSubscribeCourses = () => {
  const { loading, data } = useQuery<TOrgsQuery>(GET_CAN_SUBSCRIBE_COURSES);

  return {
    loading,
    data: data?.getCanSubscribeCourses.data,
  };
};

export const useSchedulesByCourse = (courseId: string) => {
  const { loading, data } = useQuery<TSchedulesQuery>(GET_SCHEDULES_BY_COURSE, {
    variables: {
      courseId,
    },
  });

  return {
    loading,
    data: data?.getSchedulesByCourse.data,
  };
};

export const useSubscribeCourse = () => {
  const [subscribe, { loading }] = useMutation<TBaseQuery>(SUBSCRIBE_COURSE);

  const subscribeHandler = async (
    scheduleId: string,
    cardId: string,
  ) => {
    const res = await subscribe({
      variables: {
        scheduleId,
        cardId,
      },
    });
    return res.data?.subscribeCourse;
  };

  return {
    subscribe: subscribeHandler,
    loading,
  };
};

export const useScheduleRecords = () => {
  const { data, refetch, loading } = useQuery<TScheduleRecordsQuery>(GET_SCHEDULE_RECORD, {
    variables: {
      page: {
        pageNum: 1,
        pageSize: 10,
      },
    },
  });

  return { data: data?.getScheduleRecords.data, loading, refetch };
};

export const useCancelSubscribeCourse = () => {
  const [cancel, { loading }] = useMutation<TBaseQuery>(CANCEL_SUBSCRIBE);

  const cancelHandler = async (
    scheduleRecordId: string,
  ) => {
    const res = await cancel({
      variables: {
        scheduleRecordId,
      },
    });
    return res.data?.cancelSubscribeCourse;
  };

  return {
    cancel: cancelHandler,
    loading,
  };
};
