//dependencies
import React, { useEffect } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
//utilities
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { ADD_PURCHASE, SPEND_SEEDS } from "../../utils/mutations";
import { QUERY_USER } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import Auth from '../../utils/auth';
//chakra ui
import { Box, Text, Input, Image, Container, Button } from "@chakra-ui/react";

const CartItem = ({ item }) => {
  const { data } = useQuery(QUERY_USER);

  let user;
  let seeds;

  if (data) {
    user = data.user;
    seeds = data.seeds; 
  }

  const state = useSelector(state => state);
  
  const dispatch = useDispatch();

  localStorage.setItem("seeds", item.price);

  const [addPurchase] = useMutation(ADD_PURCHASE);
  const [spendSeeds] = useMutation(SPEND_SEEDS);
  
  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
      
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
          
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
          
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  const addToPurchaseHistory = () => {
    async function savePurchase() {

      const sseeds = localStorage.getItem("seeds");

      localStorage.removeItem("seeds");

      spendSeeds({ variables: {seeds: parseFloat(sseeds)} })

      const cart = await idbPromise('cart', 'get');
      const products = cart.map(item => item._id);
      if (products.length) {
        const { data } = await addPurchase({ variables: { products } });
        const productData = data.addPurchase.products;
        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }
      alert("Thank you for your purchase. You will be redirected to your purchase history.")
      setTimeout(()=>{
        window.location.assign("/orderHistory");
      },1000);
    }
    savePurchase();
  }
      
  return (
    <Container>
    <Box align='center'>
      <Box 
      align='center'
      w='300px'
      border='2px'
      borderColor= 'brand.900'
      overflow='sm'
      bg='brand.700'>
        <Image
          src={`${item.image}`}
          alt=""
        />
      </Box>
      <Box>
        <Box>{item.name}
          <Text
            role="img"
            size="lg"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </Text>
        </Box>
        <Box> {item.price} 🌱</Box>
        <Box>
          <Text mb="8px" align="center">Qty:</Text>
          <Input
          w="12"
          alignContent="center"
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
        </Box>
        <Box>
          {
          Auth.loggedIn() ?
            <Button 
            onClick={addToPurchaseHistory}
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
    </Box>
    </Container>
  );
}

export default CartItem;