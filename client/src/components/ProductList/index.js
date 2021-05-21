//dependencies 
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';
//components
import ProductItem from "../ProductItem";
//utilities
import { QUERY_PRODUCTS } from "../../utils/queries";
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
//chakra ui
import { Heading, Box } from '@chakra-ui/layout';

function ProductList({ categoryId }) {
  const state = useSelector((state) => {
    return state
  });
  
  const dispatch = useDispatch();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS, {
    variables: { category: categoryId }
  });

  useEffect(() => {
    // if there's data to be stored
    if (data) {
      // let's store it in the global state object
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });

      console.log("data",data);
      console.log("categoryId",categoryId);

      // but let's also take each product and save it to IndexedDB using the helper function 
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
      // add else if to check if `loading` is undefined in `useQuery()` Hook
      } else if (!loading) {
          // since we're offline, get all of the data from the `products` store
          idbPromise('products', 'get').then((products) => {
            // use retrieved data to set global state for offline browsing
            dispatch({
              type: UPDATE_PRODUCTS,
              products: [products]
            });
          });
        }
      }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(product => product.category._id === currentCategory);
  }
  
  return (
    <Box fontSize="lg" align="center">
      {state.products.length ? (
        <Box d="flex" justifyContent="center" m="20px" flexWrap="wrap">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  description={product.description}
                  category={product.category}
                  userId={product.userId}
                />
            ))}
        </Box>
      ) : (
        <Heading>No products yet!</Heading>
      )}
    </Box>
  );
}

export default ProductList;