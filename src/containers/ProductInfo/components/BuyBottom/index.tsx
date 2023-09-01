import { Grid } from 'antd-mobile';
import { PhoneFill } from 'antd-mobile-icons';
import { IProduct } from '@/utils/types';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';
import style from './index.module.less';

interface IProps {
  data: IProduct
}

const BuyBottom = ({
  data,
}: IProps) => {
  const { go } = useGoTo();

  const goBuy = () => {
    go(ROUTE_KEY.BUY, {
      id: data.id,
    });
  };

  return (
    <Grid columns={10} className={style.container}>
      <Grid.Item span={4}>
        <span className={style.preferentialPrice}>
          $
          {data.preferentialPrice}
        </span>
        <span className={style.originalPrice}>
          $
          {data.originalPrice}
        </span>
      </Grid.Item>
      <Grid.Item span={2}>
        <a href={`tel:${data.org.tel}`}>
          <PhoneFill className={style.tel} />
        </a>
      </Grid.Item>
      <Grid.Item
        span={4}
        className={style.buyButton}
        onClick={goBuy}
      >
        Buy Now
      </Grid.Item>
    </Grid>
  );
};

export default BuyBottom;
