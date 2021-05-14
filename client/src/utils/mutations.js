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

// add buyer and add seller are both the same mutation
// would changing the buyer/seller typedef to one that has a toggle for buyer/seller make more sense?
export const ADD_BUYER = gql`
  mutation addBuyer($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addBuyer(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      buyer {
        _id
      }
    }
  }
`;

export const ADD_SELLER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addSeller(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      seller {
        _id
      }
    }
  }
`

// export const UPDATE_BUYER = gql`
//   mutation updateBuyer() {
//     updateBuyer() {
      
//     }
//   }
// `

// export const UPDATE_SELLER = gql`
//   mutation updateSeller() {
//     updateSeller() {

//     }
//   }
// `

// export const UPDATE_PRODUCT = gql`
//   mutation updateProduct($_id: ID!, $quantity: INT!) {
//     updateProduct(_)
//   }
// `

// type Mutation {
//   updateBuyer(firstName: String, lastName: String, email: String, password: String): Buyer
//   updateSeller(firstName: String, lastName: String, email: String, password: String): Seller
//   updateProduct(_id: ID!, quantity: Int!): Product
// }
