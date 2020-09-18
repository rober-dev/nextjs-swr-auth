// Vendor libs
const { gql } = require('apollo-server-express');

module.exports = gql`
  type Brand {
    id: ID!
    name: String!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
  }

  type User {
    id: ID!
    email: String!
    username: String!
    fullname: String
    password: String
    roles: [String!]!
  }

  type Stock {
    productId: ID!
    current: Float!
    min: Float!
  }

  type Query {
    getAllBrands: [Brand!]!
    getAllProducts: [Product!]!
    productStock(productId: ID!): Stock
  }
`;
