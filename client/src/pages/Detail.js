import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/react-hooks';


import { QUERY_PRODUCTS, QUERY_USER } from "../utils/queries";
import { useDispatch, useSelector } from 'react-redux'

import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';

import { ADD_SEEDS } from "../utils/mutations";

import SeedCart from '../components/SeedCart';
import { idbPromise } from "../utils/helpers";

import { Button, Box, Heading, Flex, Image, Text, Stack, Container, Center, Spacer, SimpleGrid} from "@chakra-ui/react";

function Detail() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
       user = data.user;
  }

  const state = useSelector((state) => {
    return state
  });

  const dispatch = useDispatch();

  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({})

  const { loading } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;
    
    useEffect(() => {
      // already in global store
      if (products.length) {
        setCurrentProduct(products.find(product => product._id === id));
      } 
      // retrieved from server
      else if (data) {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: data.products
        });
    
        data.products.forEach((product) => {
          idbPromise('products', 'put', product);
        });
      }
      // get cache from idb
      else if (!loading) {
        idbPromise('products', 'get').then((indexedProducts) => {
          dispatch({
            type: UPDATE_PRODUCTS,
            products: indexedProducts
          });
        });
      }
    }, [products, data, loading, dispatch, id]);
  
    const addToCart = () => {
      const itemInCart = cart.find((cartItem) => cartItem._id === id)
    
      if (itemInCart) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
        });
        // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
        idbPromise('cart', 'put', {
          ...itemInCart,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
        });
      } else {
        dispatch({
          type: ADD_TO_CART,
          product: { ...currentProduct, purchaseQuantity: 1 }
        });
        // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
        idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
      }
    }
  
    const removeFromCart = () => {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: currentProduct._id
      });
    
      // upon removal from cart, delete the item from IndexedDB using the `currentProduct._id` to locate what to remove
      idbPromise('cart', 'delete', { ...currentProduct });
    };

    //add seeds when adding items to cart 
    const [addSeeds] = useMutation(ADD_SEEDS);

    const handleSeedAdd = async event => {
        event.preventDefault(); 
        const mutationResponse = await addSeeds({ variables: { _id: user._id, seeds: user.seeds } }); 
        const seedCount = mutationResponse.data.addSeeds; 
    };

  //convert to Chakra
  return (
    <>
      {currentProduct ? (

        <Box className="container my-1">
          <Link to="/">
            ← Back to Products
          </Link>
          <Box
        w='300px'
        border='2px'
        borderColor= 'brand.900'
        rounded='20px'
        overflow='sm'
        bg='brand.700'>
          <Heading as="h2">{currentProduct.name}</Heading>

          <Text>
            {currentProduct.description}
          </Text>

          <Text>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <Button onClick={addToCart, handleSeedAdd}>
              Add to Cart
            </Button>
            <Button 
              disabled={!cart.find(p => p._id === currentProduct._id)} 
              onClick={removeFromCart}
            >
              Remove from Cart
            </Button>
          </Text>

          <Image
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </Box>
        </Box>
      ) : null}
      <SeedCart />
    </>
  );
};

export default Detail;
