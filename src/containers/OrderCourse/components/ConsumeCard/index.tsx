import { Space, Tag } from 'antd-mobile';
import dayjs from 'dayjs';
import { ICardRecord } from '@/utils/types';
import { CARD_TYPE, DAY_FORMAT } from '@/utils/constants';
import style from './index.module.less';

interface IProps {
  dataSource: ICardRecord;
}

const ConsumeCard = ({
  dataSource,
}: IProps) => (
  <div className={style.container}>
    <Space justify="between" block>
      <span>
        {dataSource.card.type === CARD_TYPE.TIME[0]
          && (
          <Tag
            color="primary"
            fill="outline"
          >
            {CARD_TYPE.TIME[1]}
          </Tag>
          )}
        {dataSource.card.type === CARD_TYPE.DURATION[0]
          && (
          <Tag
            color="warning"
            fill="outline"
          >
            {CARD_TYPE.DURATION[1]}
          </Tag>
          )}
        <span className={style.name}>
          {dataSource.card.name}
        </span>
      </span>
    </Space>
    <Space justify="between" block>
      <span>
        Valid to
        {dayjs(dataSource.endTime).format(DAY_FORMAT)}
      </span>
      {dataSource.card.type === CARD_TYPE.TIME[0] && dataSource.residueTime > 1 && (
      <span className={style.residueTime}>
        {dataSource.residueTime}
        &nbsp;
        times left
      </span>
      )}
      {dataSource.card.type === CARD_TYPE.TIME[0] && (dataSource.residueTime === 1) && (
      <span className={style.residueTime}>
        {dataSource.residueTime}
        &nbsp;
        time left
      </span>
      )}
    </Space>
  </div>
);

export default ConsumeCard;
