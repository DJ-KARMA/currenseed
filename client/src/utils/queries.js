import gql from 'graphql-tag';

export const QUERY_CATEGORIES = gql`
{
  categories {
    _id
    name
    image
    description
  }
}
`;

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
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

export const QUERY_USER = gql`
{
  user {
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

`;

export const QUERY_USER_BY_ID = gql`
{
  query getUserById (_id: ID){
    getUserById(_id: $_id) {
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

}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($price: String, $quantity: String) {
    checkout(price: $price, quantity: $quantity) {
      session
    }
  }
`;

export const QUERY_PRODUCT_CHECKOUT = gql`
  query getCheckout($price: Float, $quantity: Int) {
    checkoutproducts(price: $price, quantity: $quantity) {
      products
    }
  }
`;