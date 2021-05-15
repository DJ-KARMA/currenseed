//code here
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

// review purchase and order objects within query
export const QUERY_BUYER = gql`
{
  buyer {
    _id
    firstName
    lastName
    email
    orders {
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
    }
  }
}
`;

// review purchase, sale and order objects within query
export const QUERY_SELLER = gql`
{
  seller {
    _id
    firstName
    lastName
    email
    orders {

    }
    purchases {

    }
    sales {

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