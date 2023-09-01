import {
  Button, Divider, Selector, Tabs, Toast,
} from 'antd-mobile';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useSchedulesByCourse, useSubscribeCourse } from '@/services/schedule';
import { useUseCards } from '@/services/card';
import ConsumeCard from '../ConsumeCard';
import style from './index.module.less';

interface IProps {
  courseId: string;
  onClose: () => void;
}

const SubscribePopup = ({
  courseId,
  onClose,
}: IProps) => {
  const [selectSchedule, setSelectSchedule] = useState<string[]>([]);
  const [selectCard, setSelectCard] = useState<string[]>([]);

  const { data } = useSchedulesByCourse(courseId);

  const { data: cards } = useUseCards(courseId);

  const {
    subscribe,
    loading,
  } = useSubscribeCourse();

  const weekdays = useMemo(() => {
    const w = [];

    for (let i = 1; i < 8; i += 1) {
      const day = dayjs().add(i, 'day');
      const weekday = day.format('dddd');
      const times = data?.filter((item) => day.isSame(item.schoolDay, 'day'));
      // console.log('times', times);
      const orderTimes = times?.map((time) => ({
        label: `${time.startTime.slice(0, 5)}-${time.endTime.slice(0, 5)}`,
        value: time.id,
      }));

      w.push({
        weekdayLabel: weekday,
        weekdayValue: weekday,
        orderTimes,
      });
    }

    return w;
  }, [data]);

  const newCards = useMemo(() => cards?.map((item) => ({
    label: <ConsumeCard dataSource={item} />,
    value: item.id,
  })), [cards]);

  const subscribeHandler = async () => {
    // console.log(selectSchedule, selectCard);
    if (selectSchedule.length === 0 || selectCard.length === 0) {
      Toast.show({
        content: 'Please select reservation time and consumer card',
      });
      return;
    }

    const res = await subscribe(selectSchedule[0], selectCard[0]);
    if (res?.code === 200) {
      Toast.show({
        content: res.message,
      });
      onClose();
      return;
    }
    Toast.show({
      content: res?.message,
    });
  };

  return (
    <div className={style.container}>
      <Divider>Please select reservation time</Divider>
      <Tabs>
        {weekdays.map((weekday) => (
          <Tabs.Tab key={weekday.weekdayValue} title={weekday.weekdayLabel}>
            <Selector
              columns={3}
              options={weekday.orderTimes || []}
              onChange={(arr) => setSelectSchedule(arr)}
            />
          </Tabs.Tab>
        ))}
      </Tabs>
      <Divider>Please select consumer card</Divider>
      <Selector
        columns={1}
        onChange={(arr) => setSelectCard(arr)}
        options={newCards || []}
      />
      <Divider />
      <Button
        color="primary"
        loading={loading}
        className={style.button}
        onClick={subscribeHandler}
      >
        Subscribe Now
      </Button>
    </div>
  );
};

export default SubscribePopup;
