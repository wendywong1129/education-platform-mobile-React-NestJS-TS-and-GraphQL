import { useState } from 'react';
import {
  // Button,
  SearchBar,
} from 'antd-mobile';
// import { useNavigate } from 'react-router-dom';
// import { useGoTo } from '@/hooks';
// import { ROUTE_KEY } from '@/routes/menus';
// import { useProducts } from '@/services/product';
import TypeSelect from './components/TypeSelect';
import ProductList from './components/ProductList';
import style from './index.module.less';

const Home = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  // useProducts();

  // const nav = useNavigate();
  // const { go } = useGoTo();

  const onSearchHandler = (val: string) => {
    console.log('onSearchHandler', val);
    setName(val);
    console.log('name', name);
  };

  const onTypeChangeHandler = (key: string) => {
    console.log('onTypeChangeHandler', key);
    setType(key);
    console.log('type', type);
  };

  return (
    <div className={style.container}>
      {/* <Button onClick={() => {
        // nav('/my');
        go(ROUTE_KEY.MY);
      }}
      >
        Edit Profile
      </Button> */}
      <SearchBar
        placeholder="Try to search courses"
        onSearch={onSearchHandler}
      />
      <TypeSelect onChange={onTypeChangeHandler} />
      <ProductList name={name} type={type} />
    </div>
  );
};

export default Home;
