import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Toast } from 'antd-mobile';
import { AUTH_TOKEN } from './constants';

let uri = `http://${window.location.hostname}:3000/graphql`;

if (process.env.NODE_ENV === 'production') {
  uri = 'https://it-run.com/graphql';
}

const httpLink = createHttpLink({
  // uri: '//localhost:3000/graphql',
  // uri: '//192.168.1.103:3000/graphql',
  uri,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({
  graphQLErrors,
  networkError,
}) => {
  if (graphQLErrors) {
    Toast.show({
      content: 'Format of req params or data returned is wrong',
    });
    graphQLErrors.forEach((item) => {
      if (item.message === 'Unauthorized') {
        Toast.clear();
        Toast.show({
          content: 'Auth expired! Please log in',
        });
      }
    });
  }
  if (networkError) {
    Toast.clear();
    Toast.show({
      content: networkError.message,
    });
  }
});

export const client = new ApolloClient({
  // uri: 'http://localhost:3000/graphql',
  // uri: 'http://localhost:8888/graphql',
  // link: authLink.concat(httpLink),
  link: errorLink.concat(authLink.concat(httpLink)),
  // cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
