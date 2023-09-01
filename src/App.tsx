// // import React, { useState } from 'react';
// import { useEffect } from 'react';
// import {
//   useMutation,
//   // useQuery
// } from '@apollo/client';
// import {
//   Button, Form, ImageUploader, Input,
// } from 'antd-mobile';
// import classNames from 'classnames';
// import {
//   // FIND,
//   UPDATE,
// } from './graphql/demo';
// import { useUploadOSS } from './hooks/useUploadOSS';
// import styles from './App.module.less';

// const App = () => {
//   // const [name, setName] = useState('');
//   // const [desc, setDesc] = useState('');

//   useEffect(() => {
//     document.documentElement.setAttribute('data-prefers-color-scheme', 'dark');
//   }, []);

//   // const { loading, data } = useQuery(FIND, {
//   //   variables: {
//   //     id: 'cfe1bf89-e856-4927-a1d4-bfe7213f0e6e',
//   //   },
//   // });

//   const [update] = useMutation(UPDATE);

//   // const onChangeNameHandler = (v: React.ChangeEvent<HTMLInputElement>) => {
//   //   setName(v.target.value);
//   // };
//   // const onChangeDescHandler = (v: React.ChangeEvent<HTMLInputElement>) => {
//   //   setDesc(v.target.value);
//   // };

//   const onClickHandler = (v:any) => {
//     // console.log('v:', v);
//     update({
//       variables: {
//         id: 'cfe1bf89-e856-4927-a1d4-bfe7213f0e6e',
//         params: {
//           // name,
//           // desc,
//           ...v,
//         },
//       },
//     });
//   };

//   const uploadHandler = useUploadOSS();

//   return (
//     <div className={styles.container}>
//       {/* <p>
//         data:
//         {JSON.stringify(data)}
//       </p>
//       <p>
//         loading:
//         {`${loading}`}
//       </p> */}
//       {/* <p>
//         name:
//         <input onChange={onChangeNameHandler} />
//       </p>
//       <p>
//         desc:
//         <input onChange={onChangeDescHandler} />
//       </p>
//       <p>
//         <button type="button" onClick={onClickHandler}>Update</button>
//       </p> */}
//       <Form className={classNames(styles.form, styles.formPadding)}
//       layout="horizontal" onFinish={onClickHandler}
//       footer={(<Button type="submit" color="primary" size="large">Submit</Button>)}>
//         <Form.Item name="name" label="name">
//           <Input />
//         </Form.Item>
//         <Form.Item name="desc" label="description">
//           <Input />
//         </Form.Item>
//         <Form.Item name="avatar" label="avatar">
//           <ImageUploader upload={uploadHandler} />
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

import { Outlet } from 'react-router-dom';
import Bottom from './components/Bottom';
import Header from './components/Header';
import styles from './App.module.less';

const App = () => (
  <div className={styles.container}>
    <Header />
    <Outlet />
    <Bottom />
  </div>
);

export default App;
