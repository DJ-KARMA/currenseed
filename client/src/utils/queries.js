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

// type Query {
//   // product(_id: ID!): Product --> can use query products like in shop-shop instead of repeating query
//   seller: Seller
//   order(_id: ID!): Order
//   sales(_id: ID!): Sales
//   purchases(_id: ID!): Purchases
//   checkout(products: [ID]!): Checkout 
// }


export const QUERY_ = gql`
{
  
}
`
