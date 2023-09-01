import {
  Grid,
  PullToRefresh,
  ErrorBlock,
  InfiniteScroll,
} from 'antd-mobile';
import { useProducts } from '@/services/product';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';
// import PullToRefresh from '@/components/PullToRefresh';
// import InfiniteScroll from '@/components/InfiniteScroll';
import ProductCard from '../ProductCard';
import style from './index.module.less';

interface IProps {
  name: string;
  type: string;
}

// const ProductList = () => {
//   const { data } = useProducts();

//   return (
//     <div className={style.container}>
//       <PullToRefresh onRefresh={() => console.log('refresh')}>
//         <Grid columns={2} gap={10}>
//           {
//         data?.map((item) => (
//           <ProductCard data={item} />
//         ))
//       }
//         </Grid>
//       </PullToRefresh>
//     </div>
//   );
// };
const ProductList = ({
  name,
  type,
}: IProps) => {
  const {
    data, onRefresh,
    hasMore, loadMore,
  } = useProducts(name, type);

  const { go } = useGoTo();

  if (data && data.length === 0) {
    return <ErrorBlock status="empty" />;
  }

  const goProductInfo = (id: string) => {
    go(ROUTE_KEY.PRODUCT_INFO, { id });
  };

  // const loadMoreHandler = () => new Promise((r) => {
  //   setTimeout(() => {
  //     r(1);
  //   }, 1000);
  // });

  return (
    <div className={style.container}>
      <PullToRefresh onRefresh={onRefresh}>
        <Grid columns={2} gap={10}>
          {
        data?.map((item) => (
          <Grid.Item
            key={item.id}
            onClick={() => goProductInfo(item.id)}
          >
            <ProductCard data={item} />
          </Grid.Item>
        ))
      }
        </Grid>
      </PullToRefresh>
      {/* <InfiniteScroll hasMore loadMore={loadMoreHandler} /> */}
      <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
    </div>
  );
};

export default ProductList;
