/* eslint-disable import/no-extraneous-dependencies */
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { faker } from '@faker-js/faker';

// const typeDefs = `#graphql
// type Query {
//   hello: String
//   resolved: String
// }
// `;

const typeDefs = `#graphql
type UserType {
  id: String!
  name: String!
  desc: String!

  """account info"""
  account: String!
}

type Query {
  """find a user by id"""
  findById(id: String!): UserType!
}

type Mutation {
  """create a new user"""
  createUser(params: UserInput!): Boolean!

  """update a user by id"""
  updateById(id: String!, params: UserInput!): Boolean!

  """delete a user by id"""
  deleteById(id: String!): Boolean!
}

input UserInput {
  name: String!
  desc: String!
}
`;

const resolvers = {
  UserType: {
    name: () => faker.name.fullName(),
  },
};

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'hello',
};

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks,
    preserveResolvers: true,
  }),
});

startStandaloneServer(server, { listen: { port: 8888 } });
