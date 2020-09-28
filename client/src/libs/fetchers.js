// Vendor libs
import { GraphQLClient } from 'graphql-request';
import axios from 'axios';
import { allLanguages, defaultLanguage } from '../../i18n.json';

// Get environment variables
const API_URL = process.env.API_URL;
const STORE_KEY = process.env.STORE_KEY;

// Private members
const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  'store-key': STORE_KEY
};

// API REST client setup
const getRequest = {
  baseURL: API_URL,
  withCredentials: true,
  headers
};

export const apiRestFecher = (url, args) =>
  axios({ ...getRequest, url, params: { args } }).then((res) => res.data);

// ----------------------------------------------------

// GRAPHQL client setup
const GRAPHQL_URL = `${API_URL}/graphql`;
const graphQLClient = new GraphQLClient(GRAPHQL_URL, {
  headers
});
export const graphQLFetcher = (query, variables, headers) => {
  graphQLClient.options.headers = { ...graphQLClient.options.headers, ...headers };
  return graphQLClient.request(query, variables);
};
