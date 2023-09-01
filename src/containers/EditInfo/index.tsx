import { useMutation } from '@apollo/client';
import {
  Button, Form, Input, ImageUploader,
} from 'antd-mobile';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useUploadOSS } from '@/hooks/useUploadOSS';
import { COMMIT_STUDENT_INFO } from '@/graphql/user';
import { showFail, showSuccess } from '@/utils';
import { IStudent } from '@/utils/types';
import { useUserContext } from '@/hooks/userHooks';
import style from './index.module.less';

const EditInfo = () => {
  const uploadHandler = useUploadOSS();

  const [commit] = useMutation(COMMIT_STUDENT_INFO);

  const [form] = Form.useForm();

  const { store } = useUserContext();

  useEffect(() => {
    if (!store.tel) return;
    form.setFieldsValue({
      tel: store.tel,
      name: store.name,
      desc: store.desc,
      avatar: [{
        url: store.avatar,
      }],
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);

  const onClickHandler = async (v: IStudent & { avatar: [{ url:string }] }) => {
    const res = await commit(
      {
        variables: {
          params: {
            ...v,
            avatar: v.avatar[0]?.url,
          },
        },
      },
    );

    if (res.data.commitStudentInfo.code === 200) {
      showSuccess(res.data.commitStudentInfo.message);
      return;
    }

    showFail(res.data.commitStudentInfo.message);
  };

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src="https://it-run-assets.oss-ap-southeast-2.aliyuncs.com/images/1692619791482.png" alt="" />
        <div className={style.text}>IT RUN</div>
      </div>
      <Form
        form={form}
        className={classNames(style.form, style.formPadding)}
        onFinish={onClickHandler}
        footer={(
          <Button block type="submit" color="primary" size="large">
            Submit
          </Button>
      )}
      >
        <Form.Header>Please submit your profile, and every item is necessary.</Form.Header>
        <Form.Item
          name="name"
          label="Nickname"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="tel"
          label="Mobile number"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="Avatar"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <ImageUploader
            maxCount={1}
            upload={uploadHandler}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditInfo;
