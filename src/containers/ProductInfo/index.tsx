import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Result } from 'antd-mobile';
import { useProductInfo } from '@/services/product';
import { TCourse } from '@/utils/types';
import Hr from '@/components/Hr';
import style from './index.module.less';
import BaseInfo from './components/BaseInfo';
import CourseInfo from './components/CourseInfo';
import BuyBottom from './components/BuyBottom';

const ProductInfo = () => {
  const { id } = useParams();

  const { data } = useProductInfo(id || '');
  console.log('data', data);

  const courses = useMemo(() => {
    const cs: Record<string, TCourse> = {};

    data?.cards?.forEach((item) => {
      cs[item.course.id] = {
        ...item.course,
        cardName: cs[item.course.id] ? (`${cs[item.course.id].cardName} / ${item.name}`) : item.name,
      };
    });
    console.log('cs', cs);

    return Object.values(cs);
  }, [data?.cards]);
  console.log('courses', courses);

  if (!data) {
    return (
      <Result
        status="warning"
        title="Reminder"
        description="There is no info for this product"
      />
    );
  }

  return (
    <div className={style.container}>
      <BaseInfo data={data} />
      <Hr />
      <CourseInfo data={courses} />
      <BuyBottom data={data} />
    </div>
  );
};

export default ProductInfo;
