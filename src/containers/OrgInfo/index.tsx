import { useParams } from 'react-router-dom';
import { Result } from 'antd-mobile';
import { useOrganization } from '@/services/org';
import Hr from '@/components/Hr';
import style from './index.module.less';
import BaseInfo from './components/BaseInfo';
import DescInfo from './components/DescInfo';
import RecommendProducts from './components/RecommendProducts';

const OrgInfo = () => {
  const { id } = useParams();

  const { data } = useOrganization(id || '');

  if (!data) {
    return <Result status="warning" title="Reminder" description="There is no info for this store" />;
  }

  return (
    <div className={style.container}>
      <BaseInfo data={data} />
      <Hr />
      <DescInfo data={data} />
      <Hr />
      <RecommendProducts orgId={id || ''} />
    </div>
  );
};

export default OrgInfo;
