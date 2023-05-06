import { gql } from '@apollo/client';

const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!,
    $description: String!,
    $status: ProjectStatusCreate!,
    $clientId: ID!,
  ) {
    addProject(
      name: $name,
      description: $description,
      status: $status,
      clientId: $clientId,
    ) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: ID!,
    $name: String!,
    $description: String!,
    $status: ProjectStatusUpdate!,
  ) {
    updateProject(
      id: $id,
      name: $name,
      description: $description,
      status: $status,
    ) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

const REMOVE_PROJECT = gql`
  mutation removeProject($id: ID!) {
    removeProject(id: $id) {
      id
      name
      description
      status
    }
  }
`;

export { ADD_PROJECT, UPDATE_PROJECT, REMOVE_PROJECT };