import { graphqlClient } from '@/graphql';
import GRAPH_QL_SCHEMAS from '@/graphql/query';
import { ApiResponse_Default } from '@/types/apis';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';

export type AccessControlType = {
  feature_id: any;
  permission_id: any[];
};

type ApiResponse_Single = ApiResponse_Default & {
  data: {
    _id: string;
    name: string;
    created_at: string;
    access_control: AccessControlType[];
  };
};

type ApiResponse_AccessControlType = ApiResponse_Default & {
  data: AccessControlType[];
};

// NOTE: define the all Input payload types here
type ApiPayloadAccessControlType = {
  feature_id: string;
  permission_id: string[];
};

type ApiInputCreatePayload = {
  name: string;
  description: string;
  accessControl: ApiPayloadAccessControlType[];
};

type ApiInputUpdatePayload = {
  id: string;
  name: string;
  description: string;
  accessControl: ApiPayloadAccessControlType[];
};

type ApiInputUpdateStatusPayload = {
  id: string;
  status: boolean;
};

type APiInputRestoreDeletePayload = {
  roleId: string;
  roleName: string;
};

export const API_GET_ROLES_ACCESS_CONTROL = () => {
  return useQuery<ApiResponse_AccessControlType[]>({
    queryKey: ['rolesAccessControl'],
    queryFn: async () => {
      const apiResponse = await graphqlClient.request<{
        rolesAccessControl: ApiResponse_AccessControlType[];
      }>(GRAPH_QL_SCHEMAS.ROLES.QUERY.GQL_QUERY_ACCESS_CONTROL);
      return apiResponse.rolesAccessControl;
    }
  });
};

export const API_GET_ALL_ROLES = (): UseQueryResult<ApiResponse_Single[], Error> => {
  return useQuery<ApiResponse_Single[]>({
    queryKey: ['allRoles'],
    queryFn: async () => {
      const apiResponse = await graphqlClient.request<{ allRoles: ApiResponse_Single[] }>(
        GRAPH_QL_SCHEMAS.ROLES.QUERY.GQL_QUERY_ROLES
      );
      return apiResponse.allRoles;
    }
  });
};

export const API_GET_SINGLE_ROLES = (
  searchRole: {
    roleId?: string;
    roleName?: string;
  },
  isCalling: boolean = false
): UseQueryResult<ApiResponse_Single, Error> => {
  return useQuery<ApiResponse_Single>({
    queryKey: ['singleRoles'],
    queryFn: async () => {
      if (!searchRole?.roleName) {
        throw new Error('Role ID or Name is required to fetch data.');
      }
      const variables = {
        roleId: searchRole?.roleId ?? 0,
        roleName: searchRole?.roleName
      };
      const apiResponse = await graphqlClient.request<{ singleRoles: ApiResponse_Single }>(
        GRAPH_QL_SCHEMAS.ROLES.QUERY.GQL_QUERY_SINGLE_ROLES,
        variables
      );
      return apiResponse.singleRoles;
    },
    enabled: !!searchRole?.roleName && isCalling
  });
};

export const API_CREATE_ROLES = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  ApiInputCreatePayload
> => {
  return useMutation<ApiResponse_Single, Error, ApiInputCreatePayload>({
    mutationKey: ['createRoles'],
    mutationFn: async (roleData) => {
      const payload = {
        name: roleData.name,
        description: roleData.description,
        accessControl: roleData.accessControl.map((accessControl) => ({
          feature_id: accessControl.feature_id,
          permission_id: accessControl.permission_id
        }))
      };
      const apiResponse = await graphqlClient.request<{ createRoles: ApiResponse_Single }>(
        GRAPH_QL_SCHEMAS.ROLES.MUTATION.GQL_MUTATION_CREATE_ROLES,
        { roleInputData: payload }
      );
      return apiResponse.createRoles;
    }
  });
};

export const API_UPDATE_ROLES = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  ApiInputUpdatePayload
> => {
  return useMutation<ApiResponse_Single, Error, ApiInputUpdatePayload>({
    mutationKey: ['updateRoles'],
    mutationFn: async (roleData) => {
      const payload = {
        name: roleData.name,
        description: roleData.description,
        accessControl: roleData.accessControl.map((accessControl) => ({
          feature_id: accessControl.feature_id,
          permission_id: accessControl.permission_id
        }))
      };
      const apiResponse = await graphqlClient.request<{ updateRoles: ApiResponse_Single }>(
        GRAPH_QL_SCHEMAS.ROLES.MUTATION.GQL_MUTATION_UPDATE_ROLES,
        {
          roleId: roleData.id,
          roleInputData: payload
        }
      );
      return apiResponse.updateRoles;
    }
  });
};

export const API_UPDATE_STATUS_ROLES = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  ApiInputUpdateStatusPayload
> => {
  return useMutation<ApiResponse_Single, Error, ApiInputUpdateStatusPayload>({
    mutationKey: ['updateStatusRole'],
    mutationFn: async (statusData) => {
      const payload = {
        id: statusData.id,
        status: statusData.status
      };
      const apiResponse = await graphqlClient.request<{ updateStatusRole: ApiResponse_Single }>(
        GRAPH_QL_SCHEMAS.ROLES.MUTATION.GQL_MUTATION_UPDATE_STATUS_ROLES,
        {
          roleId: payload.id,
          roleStatus: payload.status
        }
      );
      return apiResponse.updateStatusRole;
    }
  });
};

export const API_TEMPORARY_DELETE_ROLES = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  { roleId: string }
> => {
  return useMutation<ApiResponse_Single, Error, { roleId: string }>({
    mutationKey: ['tempDeleteRoles'],
    mutationFn: async (roleData) => {
      const apiResponse = await graphqlClient.request<{ tempDeleteRoles: ApiResponse_Single }>(
        GRAPH_QL_SCHEMAS.ROLES.MUTATION.GQL_MUTATION_TEMPORARY_DELETE_ROLES,
        {
          roleId: roleData?.roleId
        }
      );
      return apiResponse.tempDeleteRoles;
    }
  });
};

export const API_GET_ALL_DELETE_ROLES = (): UseQueryResult<ApiResponse_Single[], Error> => {
  return useQuery<ApiResponse_Single[]>({
    queryKey: ['deleteAllRoles'],
    queryFn: async () => {
      const apiResponse = await graphqlClient.request<{ deleteAllRoles: ApiResponse_Single[] }>(
        GRAPH_QL_SCHEMAS.ROLES.QUERY.GQL_QUERY_DELETE_ROLES
      );
      return apiResponse.deleteAllRoles;
    }
  });
};

export const API_RESTORE_ROLES = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  APiInputRestoreDeletePayload
> => {
  return useMutation<ApiResponse_Single, Error, APiInputRestoreDeletePayload>({
    mutationKey: ['restoreRoles'],
    mutationFn: async (restoreData) => {
      const payload = {
        roleId: restoreData?.roleId,
        roleName: restoreData?.roleName
      };
      const apiResponse = await graphqlClient.request<{ restoreRoles: ApiResponse_Single }>(
        GRAPH_QL_SCHEMAS.ROLES.MUTATION.GQL_MUTATION_RESTORE_DELETE_ROLE,
        { variables: payload }
      );
      return apiResponse.restoreRoles;
    }
  });
};

export const API_PERMANENTLY_DELETE_ROLE = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  APiInputRestoreDeletePayload
> => {
  return useMutation<ApiResponse_Single, Error, APiInputRestoreDeletePayload>({
    mutationKey: ['permanentlyDeleteRoles'],
    mutationFn: async (restoreData) => {
      const payload = {
        roleId: restoreData?.roleId,
        roleName: restoreData?.roleName
      };
      const apiResponse = await graphqlClient.request<{
        permanentlyDeleteRoles: ApiResponse_Single;
      }>(GRAPH_QL_SCHEMAS.ROLES.MUTATION.GQL_MUTATION_PERMANENTLY_DELETE_ROLE, {
        variables: payload
      });
      return apiResponse.permanentlyDeleteRoles;
    }
  });
};
