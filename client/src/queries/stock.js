import { gql } from 'graphql-request';

export const GET_STOCK_BY_PRODUCT = gql`
  query($slug: String!) {
    getProductStock(slug: $slug) {
      productId
      current
      min
    }
  }
`;
