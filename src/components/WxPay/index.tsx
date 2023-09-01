import {
  NumberKeyboard, PasscodeInput, Popup, Toast,
} from 'antd-mobile';
import { useMockOrder } from '@/services/order';
import style from './index.module.less';

interface IProps {
  onClose: () => void;
  amount: number;
  visible: boolean;
  productId: string;
  quantity: number;
  onFinish: (result: boolean) => void;
}

const WxPay = ({
  onClose,
  visible,
  amount,
  productId,
  quantity,
  onFinish,
}: IProps) => {
  const { get } = useMockOrder();

  const onChangeHandler = async (value: string) => {
    if (value.length > 5) {
      const res = await get(
        productId,
        quantity,
        amount,
      );
      if (res.code === 10031) {
        Toast.show({
          content: res.message,
        });
        onFinish(false);
        return;
      }
      Toast.show({
        content: res.message,
      });
      onFinish(true);
    }
  };

  return (
    <Popup
      visible={visible}
      showCloseButton
      onMaskClick={() => {
        onClose();
      }}
      bodyStyle={{
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      }}
    >
      <div className={style.container}>
        <div className={style.title}>Payment Service Platform</div>
        <div className={style.amount}>
          $
          {amount}
        </div>
        <PasscodeInput
          seperated
          onChange={onChangeHandler}
          keyboard={<NumberKeyboard />}
        />
      </div>
    </Popup>
  );
};
export default WxPay;
