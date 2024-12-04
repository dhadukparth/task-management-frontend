import { gql } from 'graphql-request';

export const GQL_QUERY_ALL_USER_TAGS = gql`
  query FetchAllUserTag {
    getAllUserTags {
      status
      message
      data {
        _id
        name
        description
        is_active
        created_at
      }
    }
  }
`;

export const GQL_QUERY_SINGLE_USER_TAGS = gql`
  query FetchSingleUserTag($userTagId: ID!) {
    getSingleUserTag(id: $userTagId) {
      status
      message
      data {
        _id
        name
        description
        created_at
      }
    }
  }
`;

export const GQL_MUTATION_CREATE_USER_TAGS = gql`
  mutation CreateUserTag($userTagData: userTagInput) {
    createUserTag(userTagData: $userTagData) {
      status
      message
    }
  }
`;

export const GQL_MUTATION_UPDATE_USER_TAGS = gql`
  mutation UpdateUserTag($userTagId: ID!, $userTagData: userTagInput) {
    updateUserTag(id: $userTagId, userTagData: $userTagData) {
      status
      message
    }
  }
`;

export const GQL_MUTATION_UPDATE_STATUS_USER_TAGS = gql`
  mutation UpdateStatusUserTag($userTagId: ID!, $userTagStatus: Boolean) {
    updateStatusUserTag(id: $userTagId, status: $userTagStatus) {
      status
      message
    }
  }
`;
export const GQL_MUTATION_PERMANENTLY_DELETE_USER_TAGS = gql`
  mutation DeletePermanentlyDepartment($userTagId: ID!, $userTagName: String) {
    deletePermanentlyUserTag(id: $userTagId, name: $userTagName) {
      status
      message
    }
  }
`;
