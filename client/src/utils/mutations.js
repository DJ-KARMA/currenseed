// type Mutation {
//   addBuyer(firstName: String!, lastName: String!, email: String!, password: String!): Auth
//   addSeller(firstName: String!, lastName: String!, email: String!, password: String!): Auth
//   updateBuyer(firstName: String, lastName: String, email: String, password: String): Buyer
//   updateSeller(firstName: String, lastName: String, email: String, password: String): Seller
//   updateProduct(_id: ID!, quantity: Int!): Product
// }


import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
      name
      description
      price
      quantity
      category {
        name
      } 
      }
    }
  }
`;


export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;