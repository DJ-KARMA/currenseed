const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }
  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
    sellerId: String
  }
  type Order {
    _id: ID
    purchaseDate: String
    sellerId: String
    buyerId: String
    products: [Product]
  }
  type Buyer {
    _id: ID
    firstName: String
    lastName: String
    email: String
    purchases: [Order]
  }
  type Seller {
    _id: ID
    firstName: String
    lastName: String
    email: String
    purchases: [Order]
    sales: [Order]
  }
  type Auth {
    token: ID
    buyer: Buyer
    seller: Seller
  }
  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    buyer: Buyer
    seller: Seller
    order(_id: ID!): Order
    sales(_id: ID!): [Order]
    purchases(_id: ID!): [Order]
    checkout(products: [ID]!): Checkout 
  }
  type Mutation {
    addBuyer(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addSeller(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateBuyer(firstName: String, lastName: String, email: String, password: String): Buyer
    updateSeller(firstName: String, lastName: String, email: String, password: String): Seller
    updateProduct(_id: ID!, quantity: Int!): Product
    loginBuyer(email: String!, password: String!): Auth
    loginSeller(email: String!, password: String!): Auth
  }
  type Checkout {
    session: ID
  }
`;

module.exports = typeDefs;