import { LeftOutline } from 'antd-mobile-icons';
import classNames from 'classnames';
import { useGoTo, useMatchedRoute, useTitle } from '@/hooks';
import style from './index.module.less';

const Header = () => {
  const route = useMatchedRoute();

  useTitle(route?.name);

  const { back } = useGoTo();

  const onClickHandler = () => {
    back();
  };

  if (route?.hideHeader) {
    return null;
  }

  return (
    // <div className={style.container}>
    //   {!route?.isMenu && (
    //   <LeftOutline
    //     className={style.back}
    //     onClick={onClickHandler}
    //   />
    //   )}
    //   <div className={style.title}>
    //     {route?.name}
    //   </div>
    // </div>
    <div className={classNames({
      [style.containerLarge]: route?.isMenu,
      [style.containerSmall]: !route?.isMenu,
    })}
    >
      {!route?.isMenu && (
      <LeftOutline
        className={style.back}
        onClick={onClickHandler}
      />
      )}
      <div className={style.title}>
        {route?.name}
      </div>
    </div>
  );
};

export default Header;
