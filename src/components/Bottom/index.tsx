import { TabBar } from 'antd-mobile';
import { routes } from '@/routes/menus';
import { useGoTo, useMatchedRoute } from '@/hooks';
import SvgWrapper from '../SvgWrapper';
import style from './index.module.less';

const Bottom = () => {
  const route = useMatchedRoute();

  const { go } = useGoTo();

  const onTabChangeHandler = (key: string) => {
    // console.log('key', key);
    go(key);
  };

  if (!route?.isMenu) {
    return null;
  }

  const iconRender = (is: boolean, icon?: string) => (
    <SvgWrapper
      src={icon}
      color={is ? '#01979a' : '#999999'}
    />
  );

  return (
    <div className={style.container}>
      <TabBar onChange={onTabChangeHandler} activeKey={route?.key}>
        {
          routes.filter((it) => it.isMenu).map(
            (item) => (
              <TabBar.Item
                key={item.key}
                icon={(is) => iconRender(is, item.icon)}
                title={item.name}
              />
            ),
          )
        }
      </TabBar>
    </div>
  );
};

export default Bottom;
