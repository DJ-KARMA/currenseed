//dependencies 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//components
import CartItem from '../CartItem';
//utilities
import Auth from '../../utils/auth';
import { ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
//chakra ui
import { Box, Text, Button, Heading, SimpleGrid } from "@chakra-ui/react";

const Cart = () => {

    const state = useSelector((state) => {
      return state; 
    })

    const dispatch = useDispatch(); 
    
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

    function submitOrder() {
        const productIds = [];
      
        state.cart.forEach((item) => {
          for (let i = 0; i < item.purchaseQuantity; i++) {
            productIds.push(item._id);
          }
        });
        alert("Thank you for your order! You will now be redirected to your order history.")
    }

    return (
        <Box>
          {state.cart.length ? (
            <SimpleGrid columns={[1, null, 2, null, 4]} gap={4}>
              {state.cart.map(item => (
                <CartItem key={item._id} item={item} />
              ))}
              <Box align="center">
                <Heading> Seeds: {calculateTotal()}</Heading>
                {
                  Auth.loggedIn() ?
                    <Button 
                    onClick={submitOrder}
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