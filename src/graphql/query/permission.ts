import { gql } from 'graphql-request';

export const GQL_QUERY_PERMISSIONS = gql`
  query Permissions {
    permissions {
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

export const GQL_QUERY_SINGLE_PERMISSION = gql`
  query SinglePermission($permissionId: ID!) {
    permission(id: $permissionId) {
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

export const GQL_MUTATION_CREATE_PERMISSION = gql`
  mutation CreatePermission($permissionData: permissionInput) {
    createPermission(permissionData: $permissionData) {
      status
      message
      data {
        _id
        name
      }
    }
  }
`;

export const GQL_MUTATION_UPDATE_PERMISSION = gql`
  mutation UpdatePermission($permissionId: ID!, $permissionData: permissionInput) {
    updatePermission(id: $permissionId, permissionData: $permissionData) {
      status
      message
      data {
        _id
        name
      }
    }
  }
`;

export const GQL_MUTATION_UPDATE_STATUS_PERMISSION = gql`
  mutation StatusPermission($permissionId: ID!, $status: Boolean) {
    updateStatusPermission(id: $permissionId, status: $status) {
      status
      message
    }
  }
`;

export const GQL_MUTATION_DELETE_PERMISSION = gql`
  mutation DeletePermission($permissionId: ID!) {
    tempDeletePermission(id: $permissionId) {
      status
      message
    }
  }
`;


export const GQL_QUERY_ALL_DELETE_PERMISSION = gql`
  query TempDeletePermission {
    rollBackPermission {
      status
      message
      data {
        _id
        name
        created_at
      }
    }
  }
`;

export const GQL_MUTATION_RESTORE_DELETE_PERMISSION = gql`
  mutation RestorePermission($permissionId: ID!, $permissionName: String) {
    rollBackPermission(id: $permissionId, name: $permissionName) {
      status
      message
    }
  }
`;

export const GQL_MUTATION_PERMANENT_DELETE_PERMISSION = gql`
  mutation PermanentDeletePermission($permissionId: ID!, $permissionName: String) {
    rollBackDeletePermission(id: $permissionId, name: $permissionName) {
      status
      message
    }
  }
`;
