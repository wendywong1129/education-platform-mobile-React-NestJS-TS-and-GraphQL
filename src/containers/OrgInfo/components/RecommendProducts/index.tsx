import {
  Card, Grid, Image, Result,
} from 'antd-mobile';
import { useProductsByOrgId } from '@/services/product';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';
import style from './index.module.less';

interface IProps {
  orgId: string;
}

const RecommendProducts = ({
  orgId,
}: IProps) => {
  const data = useProductsByOrgId(orgId);

  const { go } = useGoTo();

  const goToProduct = (productId: string) => {
    go(ROUTE_KEY.PRODUCT_INFO, { id: productId });
  };

  if (!data) {
    return (
      <Result
        status="warning"
        title="Reminder"
        description="There is no recommended courses"
      />
    );
  }
  return (
    <Card title="Recommended Courses" className={style.container}>
      {
        data.map((item) => (
          <div
            key={item.id}
            onClick={() => goToProduct(item.id)}
          >
            <Grid
              columns={12}
              className={style.item}
            >
              <Grid.Item span={2}>
                <Image
                  src={item.coverUrl}
                  alt="course img"
                  className={style.img}
                />
              </Grid.Item>
              <Grid.Item span={8} className={style.content}>
                <div className={style.title}>
                  {item.name}
                </div>
                <div className={style.desc}>
                  <span className={style.descContent}>
                    {
                    item.desc
                  }
                  </span>
                  <span className={style.count}>
                    Sold&nbsp;
                    {
                    item.buyNumber || 0
                  }
                  </span>
                </div>
              </Grid.Item>
              <Grid.Item span={2}>
                <div className={style.price}>
                  $&nbsp;
                  {item.preferentialPrice}
                </div>
                <div className={style.oldPrice}>
                  $&nbsp;
                  {item.originalPrice}
                </div>
              </Grid.Item>
            </Grid>
          </div>
        ))
      }
    </Card>
  );
};

export default RecommendProducts;
