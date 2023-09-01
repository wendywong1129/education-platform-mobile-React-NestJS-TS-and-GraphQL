import { Card } from 'antd-mobile';
import { TCourse } from '@/utils/types';
import Hr from '@/components/Hr';
import style from './index.module.less';

interface IProps {
  data: TCourse[]
}

const CourseInfo = ({
  data,
}: IProps) => (
  <div className={style.container}>
    {data?.map((item) => (
      <Card title={item.cardName} key={item.id} className={style.courseCard}>
        <div className={style.contentItem}>
          {item.desc}
        </div>
        <Hr />
        <div className={style.contentItem}>
          <div className={style.label}>Reservation Info</div>
          {item.reserveInfo}
        </div>
        <Hr />
        <div className={style.contentItem}>
          <div className={style.label}>Refund Info</div>
          {item.refundInfo}
        </div>
        <Hr />
        <div className={style.contentItem}>
          <div className={style.label}>Other Info</div>
          {item.otherInfo}
        </div>
      </Card>
    ))}
  </div>
);

export default CourseInfo;
