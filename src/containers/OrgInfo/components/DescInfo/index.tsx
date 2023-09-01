import { Image } from 'antd-mobile';
import { IOrganization } from '@/utils/types';
import style from './index.module.less';

interface IProps {
  data: IOrganization
}

const DescInfo = ({
  data,
}: IProps) => (
  <div className={style.container}>
    {data.description}
    <div className={style.imgs}>
      {data.orgOtherImg && data.orgOtherImg.map((item) => (
        <Image key={item.id} src={item.url} alt="other img" />
      ))}
    </div>
  </div>
);

export default DescInfo;
