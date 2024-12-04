import { gql } from 'graphql-request';

export const GQL_QUERY_ACCESS_CONTROL = gql`
  query RolesAccessController {
    rolesAccessControl {
      status
      message
      error
      data {
        feature_id {
          _id
          name
        }
        permission_id {
          _id
          name
          description
        }
      }
    }
  }
`;

export const GQL_QUERY_ROLES = gql`
  query GetAllRoles {
    allRoles {
      status
      message
      data {
        _id
        name
        created_at
        is_active
        access_control {
          feature_id {
            _id
            name
          }
          permission_id {
            _id
            name
          }
        }
      }
    }
  }
`;

export const GQL_QUERY_SINGLE_ROLES = gql`
  query GetSingleRole($roleId: String, $roleName: String) {
    singleRoles(id: $roleId, name: $roleName) {
      status
      message
      data {
        _id
        name
        description
        is_active
        access_control {
          feature_id {
            _id
            name
          }
          permission_id {
            _id
            name
          }
        }
      }
    }
  }
`;

export const GQL_MUTATION_CREATE_ROLES = gql`
  mutation CreateRole($roleInputData: rolesInput) {
    createRoles(rolesData: $roleInputData) {
      status
      message
    }
  }
`;

export const GQL_MUTATION_UPDATE_ROLES = gql`
  mutation UpdateRole($roleId: ID!, $roleInputData: rolesInput) {
    updateRoles(id: $roleId, rolesData: $roleInputData) {
      status
      message
      data {
        _id
        name
        is_active
        access_control {
          feature_id {
            _id
            name
          }
          permission_id {
            _id
            name
          }
        }
      }
    }
  }
`;

export const GQL_MUTATION_UPDATE_STATUS_ROLES = gql`
  mutation UpdateStatusRole($roleId: ID!, $roleStatus: Boolean) {
    updateStatusRole(id: $roleId, status: $roleStatus) {
      status
      message
    }
  }
`;

export const GQL_MUTATION_TEMPORARY_DELETE_ROLES = gql`
  mutation TempDeleteRole($roleId: ID!) {
    tempDeleteRoles(id: $roleId) {
      status
      message
    }
  }
`;

export const GQL_QUERY_DELETE_ROLES = gql`
  query DeleteAllRolesList {
    deleteAllRoles {
      status
      message
    }
  }
`;

export const GQL_MUTATION_RESTORE_DELETE_ROLE = gql`
  mutation RestoreRoles($roleId: ID!, $roleName: String) {
    restoreRoles(id: $roleId, name: $roleName) {
      status
      message
    }
  }
`;

export const GQL_MUTATION_PERMANENTLY_DELETE_ROLE = gql`
  mutation PermanentlyDeleteRole($roleId: ID!, $roleName: String) {
    permanentlyDeleteRoles(id: $roleId, name: $roleName) {
      status
      message
    }
  }
`;
