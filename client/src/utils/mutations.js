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

export const ADD_PRODUCT = gql`
mutation addProduct($name: String!, $description: String!, $price: Float!, $quantity: Int!, $category: String!) {    
  addProduct(name: $name, description: $description, price: $price, quantity: $quantity, category: $category) {
    _id
    firstName
    lastName
    products{
      _id
      name
      description
      price
      quantity
      image
      category{
        _id
        name
      }
    }
}
}
`

export const DELETE_PRODUCT = gql `
  mutation deleteProduct($products: [ID]!) {
    deleteProduct(products: $products){
      _id
    }
  }
`

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $location: String!, $seeds: Float!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, location: $location, seeds: $seeds) {
      token
      user {
        _id
      }
    }
  }
`;


export const UPDATE_USER = gql`
  mutation updateUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    updateUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      _id
      firstName
      lastName
      email
      purchases {
        _id
        purchaseDate
        products {
          _id
          name
          description
          image
          quantity
          price
        }
        buyerId
        sellerId
      }
      sales {
        _id
        purchaseDate
        products {
          _id
          name
          description
          image
          quantity
          price
        }
        buyerId
        sellerId
      }
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($_id: ID!, $quantity: Int!) {
    updateProduct(_id: $_id, quantity: $quantity) {
      _id
      name
      description
      image
      quantity
      price
      category {
        name
      }
    }
  }
`
export const ADD_SEEDS = gql`
  mutation addSeeds($_id: ID!, $seeds: Float!) {
    addSeeds(_id: $_id, seeds: $seeds) {
      _id
      seeds
    }
  }
`;