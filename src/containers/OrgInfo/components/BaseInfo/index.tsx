import { CheckShieldOutline, EnvironmentOutline, PhoneFill } from 'antd-mobile-icons';
import { Grid, Image, Swiper } from 'antd-mobile';
import { IOrganization } from '@/utils/types';
import style from './index.module.less';

interface IProps {
  data: IOrganization
}

const BaseInfo = ({
  data,
}: IProps) => (
  <div className={style.container}>
    <div className={style.title}>
      <img src={data.logo} alt="logo" className={style.logo} />
      {data.name}
    </div>
    <div className={style.tags}>
      {data.tags?.split(',').map((item: string) => (
        <span className={style.tagSpan} key={item}>
          <CheckShieldOutline />
          <span className={style.tagName}>
            {item}
          </span>
        </span>
      ))}
    </div>
    <div className={style.imgSwiper}>
      <Swiper
        loop
        autoplay
      >
        {[...(data.orgFrontImg || []), ...(data.orgRoomImg || [])].map((item) => (
          <Swiper.Item key={item.id}>
            <Image
              src={item.url}
              alt="org img"
              fit="contain"
            />
          </Swiper.Item>
        ))}
      </Swiper>
    </div>
    <div className={style.address}>
      <Grid columns={24}>
        <Grid.Item span={20}>
          <EnvironmentOutline className={style.addressIcon} />
          <a href={`https://maps.google.com/?q=${data.address}`}>
            <span className={style.addressText}>
              {data.address}
            </span>
          </a>
        </Grid.Item>
        <Grid.Item span={4}>
          <a href={`tel:${data.tel}`}>
            <PhoneFill className={style.phoneIcon} />
          </a>
        </Grid.Item>
      </Grid>
    </div>
  </div>
);

export default BaseInfo;
