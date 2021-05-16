import gql from 'graphql-tag';

export const LOGIN_BUYER = gql`
  mutation loginBuyer($email: String!, $password: String!) {
    loginBuyer(email: $email, password: $password) {
      token
      buyer {
        _id
      }
    }
  }
`;

export const LOGIN_SELLER = gql`
  mutation loginSeller($email: String!, $password: String!) {
    loginSeller(email: $email, password: $password) {
      token
      seller {
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
      sellerId
      buyerId
    }
  }
`;

export const ADD_SEEDS = gql`
  mutation addSeeds($products: [ID]!) {
    addSeeds(products: $products) {
      products {
        price
      }
    }
  }
`;

export const ADD_BUYER = gql`
  mutation addBuyer($firstName: String!, $lastName: String!, $email: String!, $password: String!, $location: String!) {
    addBuyer(firstName: $firstName, lastName: $lastName, email: $email, password: $password, location: $location) {
      token
      buyer {
        _id
      }
    }
  }
`;

export const ADD_SELLER = gql`
  mutation addSeller($firstName: String!, $lastName: String!, $email: String!, $password: String!, $location: String!) {
    addSeller(firstName: $firstName, lastName: $lastName, email: $email, password: $password, location: $location) {
      token
      seller {
        _id
      }
    }
  }
`

export const UPDATE_BUYER = gql`
  mutation updateBuyer($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    updateBuyer(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
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
        sellerId
        buyerId
      }
    }
  }
`

export const UPDATE_SELLER = gql`
  mutation updateSeller($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    updateSeller(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
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
        sellerId
        buyerId
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
        sellerId
        buyerId
      }
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($_id: ID!, $quantity: INT!) {
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