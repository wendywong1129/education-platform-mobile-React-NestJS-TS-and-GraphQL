import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd-mobile';
import enUS from 'antd-mobile/es/locales/en-US';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';
// import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
// import My from './containers/My';
import StudentInfo from './components/StudentInfo';
import App from './App';
import { routes } from './routes/menus';
import { ROUTE_COMPONENT } from './routes';
import './theme.css';
// import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={enUS}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes> */}
        <StudentInfo>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/my" element={<My />} /> */}
            <Route path="/" element={<App />}>
              {routes.map((item) => {
                const Component = ROUTE_COMPONENT[item.key];
                return (
                  <Route
                    path={item.path}
                    key={item.key}
                    element={<Component />}
                  />
                );
              })}
            </Route>
          </Routes>
        </StudentInfo>
      </BrowserRouter>
    </ApolloProvider>
  </ConfigProvider>,
);
