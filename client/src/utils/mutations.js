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
`

export const ADD_SEEDS = gql`
  mutation addSeeds($products: [ID]!) {
    addSeeds(products: $products) {
      products {
        price
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
        userId
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
        userId
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