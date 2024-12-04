import { gql } from 'graphql-request';

export const GQL_QUERY_ALL_FEATURES = gql`
  query FeatureList {
    featuresList {
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

export const GQL_QUERY_SINGLE_FEATURES = gql`
  query SingleFeature($featureId: ID!) {
    singleFeature(id: $featureId) {
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

export const GQL_MUTATION_CREATE_FEATURE = gql`
  mutation CreateFeature($featureData: featureInput) {
    createFeature(featureData: $featureData) {
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

export const GQL_MUTATION_UPDATE_FEATURE = gql`
  mutation UpdateFeature($featureId: ID!, $featureData: featureInput) {
    updateFeature(id: $featureId, featureData: $featureData) {
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

export const GQL_MUTATION_PERMANENTLY_DELETE_FEATURE = gql`
  mutation PermanentlyDeleteFeature($featureId: ID!, $featureName: String) {
    permanentlyDeleteFeature(id: $featureId, name: $featureName) {
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
