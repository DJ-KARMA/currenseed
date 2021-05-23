//dependencies 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useMutation } from '@apollo/react-hooks';
//components
import CartItem from '../CartItem';
//utilities
import { ADD_PURCHASE, ADD_SALE_BY_ID, SPEND_SEEDS, ADD_SEEDS_BY_ID } from "../../utils/mutations";
import { QUERY_USER } from "../../utils/queries";
import { CLEAR_CART } from "../../utils/actions";
import { ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import Auth from '../../utils/auth';
//chakra ui
import {Button, Box, Text, Heading, useToast} from "@chakra-ui/react";

const Cart = () => {
    const buyer = useQuery(QUERY_USER);
    const [addPurchase] = useMutation(ADD_PURCHASE);
    const [spendSeeds] = useMutation(SPEND_SEEDS);
    const [addSaleById] = useMutation(ADD_SALE_BY_ID);
    const [addSeedsById] = useMutation(ADD_SEEDS_BY_ID);
    const toast = useToast();

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
    };


    const checkoutHandler = () => {
      async function savePurchase() {
          const total = calculateTotal();
          console.log(buyer.data.user);
          console.log(state.cart)
          if(buyer.data.user.seeds>=total)
          {
              spendSeeds({ variables: {seeds: parseFloat(total)} });
              const productsIds = state.cart.map(item=>item._id);
              addPurchase({ variables: {products:productsIds} });
              for(let i =0;i<state.cart.length;i++)
              {
                  let item = state.cart[i];
                  addSeedsById({ variables: {_id:item.sellerId, seeds: parseFloat(item.price)} })
                  addSaleById({ variables: {_id:item.sellerId, products: item._id} })
              }

              dispatch({
                type:  CLEAR_CART
              });

              const cart = await idbPromise('cart', 'get');
              
              cart.forEach((item) => {
                  idbPromise('cart', 'delete', item);
              });
              toast({
                description: "Thank you for your purchase. You will be redirected to your purchase history.",
                status: "success",
                isClosable: true,
            })
              
              setTimeout(()=>{
                  window.location.assign("/orderHistory");
              },2000);
          }
          else
          {
              toast({
                description: "You don't have enough seeds!",
                status: "error",
                isClosable: true,
              });

              // setTimeout(()=>{
              //   window.location.assign("/SeedItem");
              // },2000);
          }
      }
    savePurchase();
  }


    return (
        <Box>
          <Box align="center" d="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
                <Heading>Total due:</Heading>
                <Heading>{calculateTotal() + "🌱"}</Heading>          
              
              <Box>
                {
                Auth.loggedIn() ?
                  <Button 
                  m="20px"
                  onClick={checkoutHandler}
                  size="md"
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
            </Box>
          {state.cart.length ? (
              <Box d="flex" justifyContent="center" alignContent="center" flexWrap="wrap">
              {state.cart.map(item => (
                <CartItem key={item._id} item={item} />
              ))}
              </Box>
              

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