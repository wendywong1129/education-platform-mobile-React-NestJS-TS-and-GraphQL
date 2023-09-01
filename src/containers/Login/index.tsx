import { useState } from 'react';
import md5 from 'md5';
import {
  Button, Form, Input, Space,
} from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '@/utils/constants';
import { useUserContext } from '@/hooks/userHooks';
import { STUDENT_LOGIN } from '../../graphql/user';
import { showFail, showSuccess } from '../../utils';
import style from './index.module.less';

interface IValue {
  password: string;
  account: string;
}

const Login = () => {
  const [visible, setVisible] = useState(false);

  const [login, { loading }] = useMutation(STUDENT_LOGIN);

  const nav = useNavigate();

  const { store } = useUserContext();

  const loginHandler = async (values: IValue) => {
    const res = await login({
      variables: {
        password: md5(values.password),
        account: values.account,
      },
    });

    if (res.data.studentLogin.code === 200) {
      showSuccess(res.data.studentLogin.message);
      store.refetchHandler();
      localStorage.setItem(AUTH_TOKEN, res.data.studentLogin.data);
      nav('/');
      return;
    }

    const data = res.data.studentLogin;
    showFail(data);
  };

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src="https://it-run-assets.oss-ap-southeast-2.aliyuncs.com/images/1692619791482.png" alt="" />
        <div className={style.text}>IT RUN</div>
      </div>
      <Form
        layout="horizontal"
        onFinish={loginHandler}
        footer={(
          <Button loading={loading} block type="submit" color="primary" size="large">
            Login
          </Button>
        )}
      >
        <Form.Item
          label="username"
          name="account"
          rules={[{
            required: true,
            message: 'Username should not be empty',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,10}$/,
            message: 'Lowercase and number only! Length is between 6 and 10',
          }]}
        >
          <Input placeholder="Please input username" clearable />
        </Form.Item>
        <Form.Item
          label="password"
          name="password"
          rules={[{
            required: true,
            message: 'Password should not be empty',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
            message: 'Lowercase and number only! Length is longer than 6',
          }]}
          extra={(
            <div className={style.eye}>
              {!visible ? (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
              ) : (
                <EyeOutline onClick={() => setVisible(false)} />
              )}
            </div>
            )}
        >
          <Input
            placeholder="Please input password"
            clearable
            type={visible ? 'text' : 'password'}
          />
        </Form.Item>
      </Form>
      <div>
        <Space>
          No account?
          <Link to="/register">Go to register</Link>
        </Space>
      </div>
    </div>
  );
};

export default Login;
