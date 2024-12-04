import { graphqlClient } from '@/graphql';
import GRAPH_QL_SCHEMAS from '@/graphql/query';
import { ApiResponse_Default } from '@/types/apis';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';

type ApiResponse_Single = ApiResponse_Default & {
  data: {
    id: string;
    name: string;
    description: string;
  };
};

// NOTE: define the all Input types here
type ApiInputCreatePayload = {
  name: string;
  description: string;
};

type ApiInputUpdatePayload = {
  id: string;
  name: string;
  description: string;
};

type ApiInputUpdateStatusPayload = {
  id: string;
  status: boolean;
};

type ApiInputDeletePayload = {
  id: string;
  name: string;
};

export const API_GET_PERMISSIONS = (): UseQueryResult<ApiResponse_Single[], Error> => {
  return useQuery<ApiResponse_Single[], Error>({
    queryKey: ['permissions'],
    queryFn: async () => {
      const data = await graphqlClient.request<{ permissions: ApiResponse_Single[] }>(
        GRAPH_QL_SCHEMAS.PERMISSIONS.QUERY.GQL_QUERY_PERMISSIONS
      );
      return data.permissions;
    }
  });
};

export const API_GET_PERMISSION = (
  permissionId?: string,
  shouldFetch = false
): UseQueryResult<ApiResponse_Single, Error> => {
  return useQuery<ApiResponse_Single, Error>({
    queryKey: ['permission', permissionId],
    queryFn: async () => {
      if (!permissionId) {
        throw new Error('Permission ID is required to fetch data.');
      }
      const variables = { permissionId };
      const data = await graphqlClient.request<{ permission: ApiResponse_Single }>(
        GRAPH_QL_SCHEMAS.PERMISSIONS.QUERY.GQL_QUERY_SINGLE_PERMISSION,
        variables
      );
      return data.permission;
    },
    enabled: shouldFetch && !!permissionId
  });
};

export const API_CREATE_PERMISSION = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  ApiInputCreatePayload
> => {
  return useMutation<ApiResponse_Single, Error, ApiInputCreatePayload>({
    mutationKey: ['createPermission'],
    mutationFn: async (permissionData) => {
      const response = await graphqlClient.request<{
        createPermission: ApiResponse_Single;
      }>(GRAPH_QL_SCHEMAS.PERMISSIONS.MUTATION.GQL_MUTATION_CREATE_PERMISSION, { permissionData });
      return response.createPermission;
    }
  });
};

export const API_UPDATE_PERMISSION = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  ApiInputUpdatePayload
> => {
  return useMutation<ApiResponse_Single, Error, ApiInputUpdatePayload>({
    mutationKey: ['updatePermission'],
    mutationFn: async (permissionData) => {
      const updatePermission = {
        name: permissionData.name,
        description: permissionData.description
      };
      const response = await graphqlClient.request<{
        updatePermission: ApiResponse_Single;
      }>(GRAPH_QL_SCHEMAS.PERMISSIONS.MUTATION.GQL_MUTATION_UPDATE_PERMISSION, {
        permissionId: permissionData?.id,
        permissionData: updatePermission
      });
      return response.updatePermission;
    }
  });
};

export const API_UPDATE_STATUS_PERMISSION = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  ApiInputUpdateStatusPayload
> => {
  return useMutation<ApiResponse_Single, Error, ApiInputUpdateStatusPayload>({
    mutationKey: ['updateStatusPermission'],
    mutationFn: async (permissionData: ApiInputUpdateStatusPayload) => {
      const response = await graphqlClient.request<{
        updateStatusPermission: ApiResponse_Single;
      }>(GRAPH_QL_SCHEMAS.PERMISSIONS.MUTATION.GQL_MUTATION_UPDATE_STATUS_PERMISSION, {
        permissionId: permissionData?.id,
        status: permissionData?.status
      });
      return response.updateStatusPermission;
    }
  });
};

export const API_DELETE_PERMISSION = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  ApiInputDeletePayload
> => {
  return useMutation<ApiResponse_Single, Error, ApiInputDeletePayload>({
    mutationKey: ['tempDeletePermission'],
    mutationFn: async (permissionData: ApiInputDeletePayload) => {
      const response = await graphqlClient.request<{
        tempDeletePermission: ApiResponse_Single;
      }>(GRAPH_QL_SCHEMAS.PERMISSIONS.MUTATION.GQL_MUTATION_DELETE_PERMISSION, {
        permissionId: permissionData?.id
      });
      return response.tempDeletePermission;
    }
  });
};

export const API_TEMP_DELETE_PERMISSION_LIST = (): UseQueryResult<ApiResponse_Single, Error> => {
  return useQuery<ApiResponse_Single, Error>({
    queryKey: ['rollBackPermission'],
    queryFn: async () => {
      const response = await graphqlClient.request<{
        rollBackPermission: ApiResponse_Single;
      }>(GRAPH_QL_SCHEMAS.PERMISSIONS.QUERY.GQL_QUERY_ALL_DELETE_PERMISSION);
      return response.rollBackPermission;
    }
  });
};

export const API_RESTORE_PERMISSIONS = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  ApiInputDeletePayload
> => {
  return useMutation<ApiResponse_Single, Error, ApiInputDeletePayload>({
    mutationKey: ['rollBackPermission'],
    mutationFn: async (permissionData: ApiInputDeletePayload) => {
      const apiData = {
        permissionId: permissionData.id,
        permissionName: permissionData.name
      };
      const apiResponse = await graphqlClient.request<{
        rollBackPermission: ApiResponse_Single;
      }>(GRAPH_QL_SCHEMAS.PERMISSIONS.MUTATION.GQL_MUTATION_RESTORE_DELETE_PERMISSION, apiData);
      return apiResponse.rollBackPermission;
    }
  });
};

export const API_PERMANENT_DELETE_PERMISSIONS = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  ApiInputDeletePayload
> => {
  return useMutation<ApiResponse_Single, Error, ApiInputDeletePayload>({
    mutationKey: ['rollBackDeletePermission'],
    mutationFn: async (permissionData: ApiInputDeletePayload) => {
      const apiData = {
        permissionId: permissionData.id,
        permissionName: permissionData.name
      };
      const apiResponse = await graphqlClient.request<{
        rollBackDeletePermission: ApiResponse_Single;
      }>(GRAPH_QL_SCHEMAS.PERMISSIONS.MUTATION.GQL_MUTATION_PERMANENT_DELETE_PERMISSION, apiData);
      return apiResponse.rollBackDeletePermission;
    }
  });
};
