import { Image } from 'antd-mobile';
import { IProduct } from '@/utils/types';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';
import style from './index.module.less';

interface IProps {
  data: IProduct
}

const ProductCard = ({
  data,
}: IProps) => {
  const { go } = useGoTo();

  const goOrgInfo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    go(ROUTE_KEY.ORG_INFO, { id });
  };

  return (
    <div className={style.container}>
      <Image
        src={data.coverUrl}
        className={style.img}
      />
      <div className={style.info}>
        <div className={style.name}>
          {data.name}
        </div>
        <div className={style.org}>
          <span
            className={style.orgName}
            onClick={(e) => goOrgInfo(data.org.id, e)}
          >
            {data.org.name}
          </span>
          <span className={style.distance}>
            {data.distance || 'Unknown'}
          </span>
        </div>
        <div className={style.price}>
          <span className={style.preferentialPrice}>
            $
            {data.preferentialPrice}
          </span>
          <span className={style.originalPrice}>
            $
            {data.originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
