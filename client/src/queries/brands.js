import { gql } from 'graphql-request';

export const GET_ALL_BRANDS = gql`
  query GET_ALL_BRANDS {
    getAllBrands {
      id
      name
      slug
    }
  }
`;

export const GET_BRAND_BY_ID = gql`
  query GET_BRAND_BY_ID($id: ID!) {
    getBrandById(id: $id) {
      id
      name
      slug
    }
  }
`;

export const GET_BRAND_BY_SLUG = gql`
  query GET_BRAND_BY_SLUG($slug: String!) {
    getBrandBySlug(slug: $slug) {
      id
      name
      slug
    }
  }
`;

export const GET_BRAND_SLUGS = gql`
  query GET_BRAND_SLUGS {
    getBrandSlugs
  }
`;
