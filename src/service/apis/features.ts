import { graphqlClient } from '@/graphql';
import GRAPH_QL_SCHEMAS from '@/graphql/query';
import { ApiResponse_Default } from '@/types/apis';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';

type ApiResponseFeature_Single = ApiResponse_Default & {
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

type ApiInputPermanentlyDeletePayload = {
  id: string;
  name: string;
};

export const API_GET_ALL_FEATURES = () => {
  return useQuery<ApiResponseFeature_Single[], Error>({
    queryKey: ['permissions'],
    queryFn: async () => {
      const apiResponse = await graphqlClient.request<{
        featuresList: ApiResponseFeature_Single[];
      }>(GRAPH_QL_SCHEMAS.FEATURES.QUERY.GQL_QUERY_ALL_FEATURES);
      return apiResponse.featuresList;
    }
  });
};

export const API_GET_SINGLE_FEATURE = (
  featureId?: string,
  shouldFetch = false
): UseQueryResult<ApiResponseFeature_Single, Error> => {
  return useQuery<ApiResponseFeature_Single, Error>({
    queryKey: ['singleFeature', featureId],
    queryFn: async () => {
      if (!featureId) {
        throw new Error('Feature ID is required to fetch data.');
      }
      const variables = { featureId };
      const apiResponse = await graphqlClient.request<{
        singleFeature: ApiResponseFeature_Single;
      }>(GRAPH_QL_SCHEMAS.FEATURES.QUERY.GQL_QUERY_SINGLE_FEATURES, variables);
      return apiResponse.singleFeature;
    },
    enabled: shouldFetch && !!featureId
  });
};

export const API_CREATE_FEATURE = (): UseMutationResult<
  ApiResponseFeature_Single,
  Error,
  ApiInputCreatePayload
> => {
  return useMutation<ApiResponseFeature_Single, Error, ApiInputCreatePayload>({
    mutationKey: ['createFeature'],
    mutationFn: async (featureData: ApiInputCreatePayload) => {
      const response = await graphqlClient.request<{ createFeature: ApiResponseFeature_Single }>(
        GRAPH_QL_SCHEMAS.FEATURES.MUTATION.GQL_MUTATION_CREATE_FEATURE,
        { featureData }
      );
      return response.createFeature;
    }
  });
};

export const API_UPDATE_FEATURE = (): UseMutationResult<
  ApiResponseFeature_Single,
  Error,
  ApiInputUpdatePayload
> => {
  return useMutation<ApiResponseFeature_Single, Error, ApiInputUpdatePayload>({
    mutationKey: ['updateFeature'],
    mutationFn: async (featureData) => {
      const updateFeatures = {
        name: featureData.name,
        description: featureData.description
      };
      const response = await graphqlClient.request<{ updateFeature: ApiResponseFeature_Single }>(
        GRAPH_QL_SCHEMAS.FEATURES.MUTATION.GQL_MUTATION_UPDATE_FEATURE,
        {
          featureId: featureData?.id,
          featureData: updateFeatures
        }
      );
      return response.updateFeature;
    }
  });
};

export const API_PERMANENT_DELETE_FEATURES = () => {
  return useMutation({
    mutationKey: ['permanentlyDeleteFeature'],
    mutationFn: async (featuresData: ApiInputPermanentlyDeletePayload) => {
      const apiData = {
        featureId: featuresData.id,
        featureName: featuresData.name
      };
      const apiResponse = await graphqlClient.request<{
        permanentlyDeleteFeature: ApiResponseFeature_Single;
      }>(GRAPH_QL_SCHEMAS.FEATURES.MUTATION.GQL_MUTATION_PERMANENTLY_DELETE_FEATURE, apiData);
      return apiResponse.permanentlyDeleteFeature;
    }
  });
};
