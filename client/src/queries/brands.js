import { gql } from 'graphql-request';

export const GET_ALL_BRANDS = gql`
  query GET_ALL_BRANDS {
    getAllBrands {
      id
      name
    }
  }
`;
