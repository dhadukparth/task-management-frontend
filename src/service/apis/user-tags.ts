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

export const API_GET_ALL_USER_TAGS = (): UseQueryResult<ApiResponse_Single[], Error> => {
  return useQuery<ApiResponse_Single[], Error>({
    queryKey: ['getAllUserTags'],
    queryFn: async () => {
      const apiResponse = await graphqlClient.request<{
        getAllUserTags: ApiResponse_Single[];
      }>(GRAPH_QL_SCHEMAS.USER_TAGS.QUERY.GQL_QUERY_ALL_USER_TAGS);
      return apiResponse.getAllUserTags;
    }
  });
};

export const API_GET_SINGLE_USER_TAGS = (
  userTagId?: string,
  calling: boolean = false
): UseQueryResult<ApiResponse_Single, Error> => {
  return useQuery<ApiResponse_Single, Error>({
    queryKey: ['getSingleUserTag', userTagId],
    queryFn: async () => {
      if (!userTagId) {
        throw new Error('User Tag ID is required to fetch data.');
      }
      const apiResponse = await graphqlClient.request<{
        getSingleUserTag: ApiResponse_Single;
      }>(GRAPH_QL_SCHEMAS.USER_TAGS.QUERY.GQL_QUERY_SINGLE_USER_TAGS, {
        userTagId: userTagId
      });
      return apiResponse.getSingleUserTag;
    },
    // enabled: !!userTagId && calling
  });
};

export const API_CREATE_USER_TAGS = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  ApiInputCreatePayload
> => {
  return useMutation<ApiResponse_Single, Error, ApiInputCreatePayload>({
    mutationKey: ['createUserTag'],
    mutationFn: async (userTagsData: ApiInputCreatePayload) => {
      const payload = {
        name: userTagsData.name,
        description: userTagsData.description
      };
      const response = await graphqlClient.request<{ createUserTag: ApiResponse_Single }>(
        GRAPH_QL_SCHEMAS.USER_TAGS.MUTATION.GQL_MUTATION_CREATE_USER_TAGS,
        { userTagData: payload }
      );
      return response.createUserTag;
    }
  });
};

export const API_UPDATE_USER_TAGS = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  ApiInputUpdatePayload
> => {
  return useMutation<ApiResponse_Single, Error, ApiInputUpdatePayload>({
    mutationKey: ['updateUserTag'],
    mutationFn: async (userTagData) => {
      const updatePayload = {
        name: userTagData.name,
        description: userTagData.description
      };
      const response = await graphqlClient.request<{ updateUserTag: ApiResponse_Single }>(
        GRAPH_QL_SCHEMAS.USER_TAGS.MUTATION.GQL_MUTATION_UPDATE_USER_TAGS,
        {
          userTagId: userTagData?.id,
          userTagData: updatePayload
        }
      );
      return response.updateUserTag;
    }
  });
};

export const API_UPDATE_STATUS_USER_TAGS = (): UseMutationResult<
  ApiResponse_Single,
  Error,
  ApiInputUpdateStatusPayload
> => {
  return useMutation<ApiResponse_Single, Error, ApiInputUpdateStatusPayload>({
    mutationKey: ['updateStatusUserTag'],
    mutationFn: async (userTagData: ApiInputUpdateStatusPayload) => {
      const response = await graphqlClient.request<{
        updateStatusUserTag: ApiResponse_Single;
      }>(GRAPH_QL_SCHEMAS.USER_TAGS.MUTATION.GQL_MUTATION_UPDATE_STATUS_USER_TAGS, {
        userTagId: userTagData?.id,
        userTagStatus: userTagData?.status
      });
      return response.updateStatusUserTag;
    }
  });
};

export const API_PERMANENT_DELETE_USER_TAGS = () => {
  return useMutation({
    mutationKey: ['deletePermanentlyUserTag'],
    mutationFn: async (userTagData: ApiInputPermanentlyDeletePayload) => {
      const apiPayload = {
        userTagId: userTagData.id,
        userTagName: userTagData.name
      };
      const apiResponse = await graphqlClient.request<{
        deletePermanentlyUserTag: ApiResponse_Single;
      }>(GRAPH_QL_SCHEMAS.USER_TAGS.MUTATION.GQL_MUTATION_PERMANENTLY_DELETE_USER_TAGS, apiPayload);
      return apiResponse.deletePermanentlyUserTag;
    }
  });
};
