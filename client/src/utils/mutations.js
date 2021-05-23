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
        sellerId
      }
    }
  }
`;

export const ADD_PURCHASE = gql`
  mutation addPurchase($products: [ID]) {
    addPurchase(products: $products) {
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
        sellerId
      }
    }
  }
`;

export const ADD_SALE_BY_ID = gql`
mutation addSaleById($_id : ID ,$products: [ID]) {
  addSaleById(_id:$_id,products: $products) {
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
      sellerId
    }
  }
}
`;


export const ADD_PRODUCT = gql`
mutation addProduct($name: String!, $description: String!, $price: Float!, $quantity: Int!, $category: String!, $sellerId: String!) {    
  addProduct(name: $name, description: $description, price: $price, quantity: $quantity, category: $category, sellerId: $sellerId) {
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
      sellerId
    }
}
}
`

export const DELETE_PRODUCT = gql `
  mutation deleteProduct($productId: ID!) {
    deleteProduct(productId: $productId){
      _id
    firstName
    lastName
    seeds
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
      sellerId
    }
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
      seeds
      location
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
        sellerId
      }
      orders {
        _id
        purchaseDate
        sellerId
        buyerId
        products {
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
          sellerId
        }
      }
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
          category{
            _id
            name
          }
          sellerId
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
          category{
            _id
            name
          }
          sellerId
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
        _id
        name
      }
      sellerId
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
`

export const ADD_SEEDS_BY_ID = gql`
  mutation addSeedsById($_id: ID!, $seeds: Float!) {
    addSeedsById(_id: $_id, seeds: $seeds) {
      _id
      seeds
    }
  }
`

export const PURCHASE_SEEDS = gql`
  mutation purchaseSeeds($seeds: Float!) {
    purchaseSeeds(seeds: $seeds) {
      _id
      seeds
    }
}
`

export const SPEND_SEEDS = gql`
  mutation spendSeeds($seeds: Float!) {
    spendSeeds(seeds: $seeds) {
      _id
      seeds
    }
}
`
