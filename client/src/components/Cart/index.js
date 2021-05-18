import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Button, Heading, SimpleGrid } from "@chakra-ui/react";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {

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

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

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

    if (!state.cartOpen) {
        return (
          <Box onClick={toggleCart}>
            <Heading><Text
              role="img"
              aria-label="sunflower" align="center">🌻 Your cart</Text>
              </Heading>
          </Box>
        );
    }

  return (
<Box>
 
  <Button size="lg" onClick={toggleCart}>Close 🛒</Button>
  
  {/* <Heading align="center">Cart</Heading> */}

  {state.cart.length ? (
    <SimpleGrid columns={[1, null, 2, null, 4]} gap={4}>
      {state.cart.map(item => (
        <CartItem key={item._id} item={item} />
      ))}
      <Box align="center">
        <Heading>Seeds: {calculateTotal()}</Heading>
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

export default Cart;