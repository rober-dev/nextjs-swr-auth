// Vendor libs
import { GraphQLClient } from 'graphql-request';
import axios, { AxiosRequestConfig } from 'axios';

// API REST client setup
const API_URL = process.env.API_URL;
const getRequest = {
  baseURL: API_URL,
  withCredentials: true,
  method: 'GET',
  headers: {
    lng: 'es',
  },
};

export const apiRestFecher = (url, args) =>
  axios({ ...getRequest, url, params: { args } }).then((res) => res.data);

// ----------------------------------------------------

// GRAPHQL client setup
const GRAPHQL_URL = `${process.env.API_URL}/graphql`;
const graphQLClient = new GraphQLClient(GRAPHQL_URL, {
  headers: {
    'Content-Type': 'application/json',
    lng: 'es',
  },
});
export const graphQLFetcher = (query, variables) =>
  graphQLClient.request(query, variables);
