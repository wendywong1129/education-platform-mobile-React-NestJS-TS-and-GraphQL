import { Grid, Image } from 'antd-mobile';
import { IProduct } from '@/utils/types';
import Hr from '@/components/Hr';
import style from './index.module.less';

interface IProps {
  data: IProduct
}

const BaseInfo = ({
  data,
}: IProps) => (
  <div className={style.container}>
    <div className={style.headerContainer}>
      <Image
        src={data.bannerUrl}
        alt=""
        className={style.image}
      />
      <div className={style.title}>{data.name}</div>
      <div className={style.desc}>{data.desc}</div>
    </div>
    <Hr />
    <Grid columns={3} gap={8} className={style.sale}>
      <Grid.Item>
        Current Stock:
        {' '}
        {data.curStock}
      </Grid.Item>
      <Grid.Item>
        Limit Number:
        {' '}
        {data.limitBuyNumber}
      </Grid.Item>
      <Grid.Item>
        Sold:
        {' '}
        {data.buyNumber || 0}
      </Grid.Item>
    </Grid>
  </div>
);

export default BaseInfo;
