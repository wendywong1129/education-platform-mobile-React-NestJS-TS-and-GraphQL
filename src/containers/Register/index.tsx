import {
  Button, Form, Input, Space,
} from 'antd-mobile';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import md5 from 'md5';
import { STUDENT_REGISTER } from '../../graphql/user';
import { showFail, showSuccess } from '../../utils';
import style from './index.module.less';

interface IValue {
  password: string;
  account: string;
}

const Register = () => {
  const [form] = Form.useForm();
  const [register, { loading }] = useMutation(STUDENT_REGISTER);
  const nav = useNavigate();

  const onRegisterHandler = async (values: IValue) => {
    const res = await register({
      variables: {
        password: md5(values.password),
        account: values.account,
      },
    });
    if (res.data.studentRegister.code === 200) {
      showSuccess(res.data.studentRegister.message);
      nav('/login');
      return;
    }
    const data = res.data.studentRegister;
    showFail(data);
  };
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src="https://it-run-assets.oss-ap-southeast-2.aliyuncs.com/images/1692619791482.png" alt="" />
        <div className={style.text}>IT RUN</div>
      </div>
      <Form
        form={form}
        layout="horizontal"
        onFinish={onRegisterHandler}
        footer={(
          <Button loading={loading} block type="submit" color="primary" size="large">
            Register
          </Button>
          )}
      >
        <Form.Item
          rules={[{
            required: true,
            message: 'Username should not be empty',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,10}$/,
            message: 'Lowercase and number only! Length is between 6 and 10',
          }]}
          label="username"
          name="account"
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
        >
          <Input
            placeholder="Please input password"
            clearable
            type="password"
          />
        </Form.Item>
        <Form.Item
          rules={[{
            required: true,
            message: 'Password should not be empty',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
            message: 'Lowercase and number only! Length is longer than 6',
          }, {
            validator: (_, value) => {
              const password = form.getFieldValue('password');
              if (password === value) {
                return Promise.resolve();
              }
              return Promise.reject();
            },
            message: 'passwords you have input should be same',
          }]}
          label="confirm"
          name="passwordConfirm"
        >
          <Input
            placeholder="Please confirm password"
            clearable
            type="password"
          />
        </Form.Item>
      </Form>
      <div>
        <Space>
          Existing user?
          <Link to="/login">Go to login</Link>
        </Space>
      </div>
    </div>
  );
};

export default Register;
