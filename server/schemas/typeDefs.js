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
    userId: String
  }
  type Order {
    _id: ID
    purchaseDate: String
    userId: String
    products: [Product]
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
    sales: [Order]
    purchases: [Order]
    products: [Order]
    seeds: Float
    location: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    orders(_id: ID!): Order
    sales(_id:ID!): Order
    purchases(_id:ID!): Order
    checkout(products: [ID]!): Checkout 
  }
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    addProduct($name: String!, $description: String!, $price: Float!, $quantity: Int!, $category: String!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
  type Checkout {
    session: ID
  }
`;

module.exports = typeDefs;