import gql from 'graphql-tag';

export const QUERY_CATEGORIES = gql`
{
  categories {
    _id
    name
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
      }
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
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;