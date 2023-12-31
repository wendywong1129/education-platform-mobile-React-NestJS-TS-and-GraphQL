import { BankcardOutline } from 'antd-mobile-icons';
import { Space, Tag } from 'antd-mobile';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { CARD_STATUS, CARD_TYPE, DAY_FORMAT } from '@/utils/constants';
import { useCards } from '@/services/card';
import style from './index.module.less';

/**
* 我的消费卡
*/
const MyCard = () => {
  const { data } = useCards();
  return (
    <div className={style.container}>
      {
      data?.map((item) => (
        <div
          key={item.id}
          className={classNames({
            [style.itemContainer]: true,
            [style.expired]: item.status === CARD_STATUS.EXPIRED,
            [style.deplete]: item.status === CARD_STATUS.DEPLETE,
          })}
        >
          <Space justify="between" className={style.top}>
            <span>
              <BankcardOutline />
              <span className={style.name}>
                {item.card.name}
              </span>
            </span>
            {
              item.card.type === CARD_TYPE.TIME[0] && item.residueTime > 1 && (
                <Tag color="#fff" fill="outline">
                  {CARD_TYPE.TIME[1]}
                  &nbsp;
                  (
                  {item.residueTime}
                  &nbsp;
                  times left
                  )
                </Tag>
              )
            }
            {
              item.card.type === CARD_TYPE.TIME[0] && (item.residueTime === 1) && (
                <Tag color="#fff" fill="outline">
                  {CARD_TYPE.TIME[1]}
                  &nbsp;
                  (
                  {item.residueTime}
                  &nbsp;
                  time left
                  )
                </Tag>
              )
            }
            {
              item.card.type === CARD_TYPE.DURATION[0] && (
                <Tag color="warning" fill="outline">
                  {CARD_TYPE.DURATION[1]}
                </Tag>
              )
            }
          </Space>
          <Space justify="between" className={style.bottom}>
            <span>{item.org.name}</span>
            <span>
              Valid to:
              {' '}
              {dayjs(item.endTime).format(DAY_FORMAT)}
            </span>
          </Space>
        </div>
      ))
      }
    </div>
  );
};

export default MyCard;
