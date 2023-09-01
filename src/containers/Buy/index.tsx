import { useParams } from 'react-router-dom';
import { Grid, Stepper, Toast } from 'antd-mobile';
import { useState } from 'react';
import { uniqueId } from 'lodash';
import { useProductInfo } from '@/services/product';
import { useUserContext } from '@/hooks/userHooks';
import { useWxpayConfig } from '@/services/order';
import Hr from '@/components/Hr';
import { DISABLE_DEV } from '@/utils/constants';
import WxPay from '@/components/WxPay';
import FailResult from './components/FailResult';
import SuccessResult from './components/SuccessResult';
import style from './index.module.less';

const { WeixinJSBridge } = window as any;

const Buy = () => {
  const [count, setCount] = useState<number>(1);
  const [showResult, setShowResult] = useState({
    showSuccess: false,
    showFail: false,
  });
  const [openPay, setOpenPay] = useState<boolean>(false);

  const { id = '' } = useParams();

  const { data } = useProductInfo(id);

  const {
    store,
    setStore,
  } = useUserContext();

  const { getWxConfig } = useWxpayConfig();

  const buyHandler = async () => {
    if (DISABLE_DEV) {
      setStore({
        openid: uniqueId(),
      });
      setOpenPay(true);
      return;
    }

    if (!store.openid) {
      // window.location.href = `/wx/login?userId=${store.id}&url=${window.location.href}`;
      Toast.show({
        content: 'Failed to get openid',
      });
      return;
    }

    if (!data || !id) {
      Toast.show({
        content: 'Failed to get product info',
      });
      return;
    }

    if (typeof WeixinJSBridge !== 'undefined') {
      const wxConfig = await getWxConfig(
        id,
        count,
        data.preferentialPrice * count,
      );

      if (!wxConfig) return;

      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
          ...wxConfig,
        },
        (res: { err_msg: string }) => {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            setShowResult({
              showSuccess: true,
              showFail: false,
            });
            return;
          }

          setShowResult({
            showSuccess: false,
            showFail: true,
          });
        },
      );
    } else {
      Toast.show({
        content: 'Please open this page through WeChat',
      });
      // const wxConfig = await getWxConfig(
      //   id,
      //   count,
      //   data.preferentialPrice * count,
      // );
      // console.log('wxConfig:', wxConfig);
    }
  };

  const onWxpayCloseHandler = () => {
    setOpenPay(false);
  };

  const onFinishHandler = (result: boolean) => {
    if (result) {
      setShowResult({
        showSuccess: true,
        showFail: false,
      });
      return;
    }
    setShowResult({
      showSuccess: false,
      showFail: true,
    });
  };

  if (!data) {
    return null;
  }

  if (showResult.showFail) {
    return (
      <FailResult
        price={data.preferentialPrice * count}
        orgName={data.org.name}
      />
    );
  }

  if (showResult.showSuccess) {
    return (
      <SuccessResult
        price={data.preferentialPrice * count}
        orgName={data.org.name}
        productName={data.name}
        productDesc={data.desc}
      />
    );
  }

  return (
    <div className={style.container}>
      <WxPay
        visible={openPay}
        onClose={onWxpayCloseHandler}
        amount={data.preferentialPrice * count}
        onFinish={onFinishHandler}
        productId={id}
        quantity={count}
      />
      <div className={style.organization}>
        <div className={style.logo}>
          <img
            alt=""
            src={data.org.logo}
            className={style.logoImg}
          />
        </div>
        <div className={style.orgName}>{data.org.name}</div>
      </div>
      <Hr />
      <div className={style.title}>
        {data.name}
      </div>
      <div className={style.desc}>
        {data.desc}
      </div>
      <Hr />
      <div className={style.count}>
        Purchase
        <Stepper
          className={style.step}
          value={count}
          onChange={(value) => {
            setCount(value);
          }}
        />
      </div>
      <div className={style.price}>
        Subtotal: $
        {data.preferentialPrice * count}
        <span className={style.originalPrice}>
          $
          {data.originalPrice * count}
        </span>
      </div>
      <Hr />
      <div className={style.user}>
        <span className={style.telLabel}>
          Mobile Number
        </span>
        <span className={style.tel}>
          {store.tel}
        </span>
      </div>
      <Grid
        columns={2}
        className={style.buyContainer}
      >
        <Grid.Item span={1}>
          <span className={style.preferentialPrice}>
            $
            {data.preferentialPrice * count}
          </span>
          <span className={style.originalPrice}>
            $
            {data.originalPrice * count}
          </span>
        </Grid.Item>
        <Grid.Item
          span={1}
          className={style.buyButton}
          onClick={buyHandler}
        >
          {store.openid ? 'Submit Order' : 'Choose WePay'}
        </Grid.Item>
      </Grid>
    </div>
  );
};

export default Buy;
