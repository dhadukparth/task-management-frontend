import { ENV_GRAPHQL_PATH } from '@/service/env-config';
import { GraphQLClient } from 'graphql-request';

const BASE_URL = ENV_GRAPHQL_PATH || '';

export const graphqlClient = new GraphQLClient(BASE_URL, {
    headers: {
        // authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});
