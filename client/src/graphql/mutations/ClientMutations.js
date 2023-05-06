import { gql } from '@apollo/client';

const ADD_CLIENT = gql`
  mutation addClient(
    $name: String!,
    $email: String!,
    $phone: String!,
  ) {
    addClient(
      name: $name,
      email: $email,
      phone: $phone,
    ) {
      id
      name
      email
      phone
    }
  }
`;

const REMOVE_CLIENT = gql`
  mutation removeClient($id: ID!) {
    removeClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { ADD_CLIENT, REMOVE_CLIENT };