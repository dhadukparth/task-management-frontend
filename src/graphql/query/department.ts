import { gql } from 'graphql-request';

export const GQL_QUERY_ALL_DEPARTMENTS = gql`
  query FetchAllDepartments {
    getAllDepartment {
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

export const GQL_QUERY_SINGLE_DEPARTMENT = gql`
  query FetchSingleDepartment($departmentId: ID!) {
    getSingleDepartment(id: $departmentId) {
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

export const GQL_MUTATION_CREATE_DEPARTMENTS = gql`
  mutation CreateDepartment($departmentData: departmentInput) {
    createDepartment(departmentData: $departmentData) {
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

export const GQL_MUTATION_UPDATE_DEPARTMENTS = gql`
  mutation UpdateDepartment($departmentId: ID!, $departmentData: departmentInput) {
    updateDepartment(id: $departmentId, departmentData: $departmentData) {
      status
      message
    }
  }
`;

export const GQL_MUTATION_UPDATE_STATUS_DEPARTMENTS = gql`
  mutation UpdateStatusDepartment($departmentId: ID!, $departmentStatus: Boolean) {
    updateStatusDepartment(id: $departmentId, status: $departmentStatus) {
      status
      message
    }
  }
`;

export const GQL_MUTATION_PERMANENTLY_DELETE_DEPARTMENTS = gql`
  mutation DeletePermanentlyDepartment($departmentId: ID!, $departmentName: String) {
    deletePermanentlyDepartment(id: $departmentId, name: $departmentName) {
      status
      message
    }
  }
`;
