import {
  DotLoading, Popup, Result, Space, Steps,
} from 'antd-mobile';
import { useState } from 'react';
import { useCanSubscribeCourses } from '@/services/schedule';
import CourseList from './components/CourseList';
import style from './index.module.less';
import SubscribePopup from './components/SubscribePopup';

const { Step } = Steps;

const OrderCourse = () => {
  const [curCourse, setCurCourse] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const { data, loading } = useCanSubscribeCourses();

  if (loading) {
    return (
      <Space justify="center">
        <DotLoading color="primary" />
      </Space>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Result
        status="warning"
        title="No course can be reserved"
      />
    );
  }

  const onSubscribeHandler = (id: string) => {
    setCurCourse(id);
    setShowPopup(true);
  };

  const onCloseHandler = () => {
    setCurCourse('');
    setShowPopup(false);
  };

  return (
    <div className={style.container}>
      <Steps
        direction="vertical"
      >
        {data?.map((item) => (
          <Step
            key={item.id}
            title={item.name}
            description={item.courses ? (
              <CourseList
                onSubscribe={onSubscribeHandler}
                dataSource={item.courses}
              />
            ) : null}
            icon={(
              <img
                className={style.logo}
                src={item.logo}
                alt="org logo"
              />
            )}
          />
        ))}
      </Steps>
      <Popup
        visible={showPopup}
        position="bottom"
        onMaskClick={onCloseHandler}
        onClose={onCloseHandler}
      >
        {curCourse
         && <SubscribePopup onClose={onCloseHandler} courseId={curCourse} />}
      </Popup>
    </div>
  );
};

export default OrderCourse;
