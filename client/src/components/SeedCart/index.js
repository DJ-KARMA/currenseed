//dependencies
import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
//components
import CartItem from '../CartItem';
//utilities
import Auth from '../../utils/auth';
import { ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { QUERY_CHECKOUT } from '../../utils/queries';
//stripe functionality 
import { loadStripe } from '@stripe/stripe-js';
//chakra ui
import { Box, Text, Button, Heading, SimpleGrid } from "@chakra-ui/react";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const SeedCart = () => {

    const state = useSelector((state) => {
      return state; 
    })

    const dispatch = useDispatch(); 
    
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        async function getCart() {
          const cart = await idbPromise('cart', 'get');
          dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        };
      
        if (!state.cart.length) {
          getCart();
        }
    }, [state.cart.length, dispatch]);

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
          sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function submitCheckout() {
        const productIds = [];
      
        state.cart.forEach((item) => {
          for (let i = 0; i < item.purchaseQuantity; i++) {
            productIds.push(item._id);
          }
        });

        getCheckout({
            variables: { products: productIds }
        });
    }
    useEffect(() => {
        if (data) {
          stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
          });
        }
    }, [data]);

  return (
<Box>

  {state.cart.length ? (
    <SimpleGrid columns={[1, null, 2, null, 4]} gap={4}>
      {state.cart.map(item => (
        <CartItem key={item._id} item={item} />
      ))}
      <Box align="center">
        <Heading> ${calculateTotal()}</Heading>
        {
          Auth.loggedIn() ?
            <Button 
            onClick={submitCheckout}
            size="sm"
            rounded="md"
            color={["brand.500"]}
            bg={["brand.800"]}
            _hover={{
              bg: ["white"]
            }}
          >          
            Checkout
            </Button>
            :
            <Text>(log in to check out)</Text>
        }
  
      </Box>
    </SimpleGrid>
  ) : (
    <Heading>
      <Text role="img" aria-label="sad flower" align="center">
      🥀
      
      Your cart is empty!
      </Text>
    </Heading>
  )}
</Box>
  );
};

export default SeedCart;