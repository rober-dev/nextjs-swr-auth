// Vendor libs
import { GraphQLClient } from 'graphql-request';
import axios from 'axios';

// Custom libs
import { getAccessToken } from './token-helper';

// API REST client setup
const API_URL = process.env.API_URL;
const getRequest = {
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    lng: 'es',
    authorization: getAccessToken()
  }
};

export const apiRestFecher = (url, args) =>
  axios({ ...getRequest, url, params: { args } }).then((res) => res.data);

// ----------------------------------------------------

// GRAPHQL client setup
const GRAPHQL_URL = `${process.env.API_URL}/graphql`;
const graphQLClient = new GraphQLClient(GRAPHQL_URL, {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    lng: 'es',
    authorization: getAccessToken()
  }
});
export const graphQLFetcher = (query, variables) => graphQLClient.request(query, variables);
