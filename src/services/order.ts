import { useMutation } from '@apollo/client';
// import { Toast } from 'antd-mobile';
import { TWxConfigQuery } from '@/utils/types';
import { GET_WXPAY_CONFIG, MOCK_ORDER } from '@/graphql/order';

export const useWxpayConfig = () => {
  const [get, { loading }] = useMutation<TWxConfigQuery>(GET_WXPAY_CONFIG);

  const getHandler = async (
    productId: string,
    quantity:number,
    amount: number,
  ) => {
    const res = await get({
      variables: {
        productId,
        amount,
        quantity,
      },
    });

    // if (res.data?.getWxpayConfig.code === 10031) {
    //   Toast.show({
    //     content: res.data?.getWxpayConfig.message,
    //   });
    //   return null;
    // }
    return res.data?.getWxpayConfig.data;
  };

  return {
    getWxConfig: getHandler,
    loading,
  };
};

export const useMockOrder = () => {
  const [get, { loading }] = useMutation(MOCK_ORDER);

  const getHandler = async (
    productId: string,
    quantity: number,
    amount: number,
  ) => {
    const res = await get({
      variables: {
        productId,
        quantity,
        amount,
      },
    });
    return res.data?.mockOrderGenerator;
  };

  return {
    get: getHandler,
    loading,
  };
};
