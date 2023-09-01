import { gql } from '@apollo/client';

export const FIND = gql`
query find($id: String!){
  findById(id: $id){
    name
    desc
    id
  }
}
`;

export const UPDATE = gql`
mutation update($id: String!, $params: UserInput!){
  updateById(id: $id, params: $params)
}
`;
