const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
    description: String
    image: String
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
    products: [Product]
    sellerId: String
    buyerId: String
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
    sales: [Order]
    purchases: [Order]
    seeds: Float
    products: [Product]
    location: String
  }
  type Checkout {
    session: ID
  }
  type Auth {
    token: ID!
    user: User
  }
  input NewProduct {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: String
    userId: String
  }
  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    orders(_id: ID!): Order
    sales(_id:ID!): Order
    purchases(_id:ID!): Order
    checkout(price: String,quantity: String): Checkout 
  }
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, location: String!, seeds: Float!): Auth
    addOrder(products: [ID]!): Order
    addProduct(name: String!, description: String!, price: Float!, quantity: Int!, category: String!): User
    addSeeds(_id: ID!, seeds: Float!): User
    purchaseSeeds(seeds: Float!): User
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    createProduct(productInfo: NewProduct!): User
    deleteProduct(productId: ID!): User
  }

`;

module.exports = typeDefs;