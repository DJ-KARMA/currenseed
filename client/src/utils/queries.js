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
      category{
        _id
        name
      }
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
      }
      buyerId
      sellerId
    }
  }
}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($price: String, $quantity: String) {
    checkout(price: $price, quantity:$quantity) {
      session
    }
  }
`;