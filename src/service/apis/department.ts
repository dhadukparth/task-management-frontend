import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { graphqlClient } from '../../graphql';
import GRAPH_QL_SCHEMAS from '../../graphql/query';
import { ApiResponse_Default } from '../../types/apis';

type ApiResponse_Single = ApiResponse_Default & {
  data: {
    id: string;
    name: string;
    description: string;
  };
};

// NOTE: define the all payload type here
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

type ApiInputPermanentlyDeletePayload = {
  id: string;
  name: string;
};

export const API_GET_ALL_DEPARTMENTS = (): UseQueryResult<ApiResponse_Single[], Error> => {
  return useQuery<ApiResponse_Single[], Error>({
    queryKey: ['getAllDepartment'],
    queryFn: async () => {
      const apiResponse = await graphqlClient.request<{
        getAllDepartment: ApiResponse_Single[];
      }>(GRAPH_QL_SCHEMAS.DEPARTMENT.QUERY.GQL_QUERY_ALL_DEPARTMENTS);
      return apiResponse.getAllDepartment;
    }
  });
};

export const API_GET_SINGLE_DEPARTMENTS = (
  departmentId?: string,
  calling: boolean = false
): UseQueryResult<ApiResponse_Single, Error> => {
  return useQuery<ApiResponse_Single, Error>({
    queryKey: ['getSingleDepartment', departmentId],
    queryFn: async () => {
      if (!departmentId) {
        throw new Error('Department ID is required to fetch data.');
      }
      const apiResponse = await graphqlClient.request<{
        getSingleDepartment: ApiResponse_Single;
      }>(GRAPH_QL_SCHEMAS.DEPARTMENT.QUERY.GQL_QUERY_SINGLE_DEPARTMENT, {
        departmentId: departmentId
      });
      return apiResponse.getSingleDepartment;
    },
    enabled: !!departmentId && calling
  });
};

export const API_CREATE_DEPARTMENT = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  ApiInputCreatePayload
> => {
  return useMutation<ApiResponse_Single, Error, ApiInputCreatePayload>({
    mutationKey: ['createDepartment'],
    mutationFn: async (departmentData: ApiInputCreatePayload) => {
      const payload = {
        name: departmentData.name,
        description: departmentData.description
      };
      const response = await graphqlClient.request<{
        createDepartment: ApiResponse_Single;
      }>(GRAPH_QL_SCHEMAS.DEPARTMENT.MUTATION.GQL_MUTATION_CREATE_DEPARTMENTS, {
        departmentData: payload
      });
      return response.createDepartment;
    }
  });
};

export const API_UPDATE_DEPARTMENT = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  ApiInputUpdatePayload
> => {
  return useMutation<ApiResponse_Single, Error, ApiInputUpdatePayload>({
    mutationKey: ['updateDepartment'],
    mutationFn: async (departmentData) => {
      const updatePayload = {
        name: departmentData.name,
        description: departmentData.description
      };
      const response = await graphqlClient.request<{
        updateDepartment: ApiResponse_Single;
      }>(GRAPH_QL_SCHEMAS.DEPARTMENT.MUTATION.GQL_MUTATION_UPDATE_DEPARTMENTS, {
        departmentId: departmentData?.id,
        departmentData: updatePayload
      });
      return response.updateDepartment;
    }
  });
};

export const API_UPDATE_STATUS_DEPARTMENT = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  ApiInputUpdateStatusPayload
> => {
  return useMutation<ApiResponse_Single, Error, ApiInputUpdateStatusPayload>({
    mutationKey: ['updateStatusDepartment'],
    mutationFn: async (departmentData: ApiInputUpdateStatusPayload) => {
      const response = await graphqlClient.request<{
        updateStatusDepartment: ApiResponse_Single;
      }>(GRAPH_QL_SCHEMAS.DEPARTMENT.MUTATION.GQL_MUTATION_UPDATE_STATUS_DEPARTMENTS, {
        departmentId: departmentData?.id,
        departmentStatus: departmentData?.status
      });
      return response.updateStatusDepartment;
    }
  });
};

export const API_PERMANENT_DELETE_DEPARTMENT = () => {
  return useMutation({
    mutationKey: ['deletePermanentlyDepartment'],
    mutationFn: async (departmentData: ApiInputPermanentlyDeletePayload) => {
      const apiPayload = {
        departmentId: departmentData.id,
        departmentName: departmentData.name
      };
      const apiResponse = await graphqlClient.request<{
        deletePermanentlyDepartment: ApiResponse_Single;
      }>(
        GRAPH_QL_SCHEMAS.DEPARTMENT.MUTATION.GQL_MUTATION_PERMANENTLY_DELETE_DEPARTMENTS,
        apiPayload
      );
      return apiResponse.deletePermanentlyDepartment;
    }
  });
};
