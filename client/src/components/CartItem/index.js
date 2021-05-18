import React from 'react';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Input, Image, Container } from "@chakra-ui/react";

const CartItem = ({ item }) => {

  const state = useSelector((state) => {
    return state
  });
  
  const dispatch = useDispatch();

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
          src={`/images/${item.image}`}
          alt=""
        />
      </Box>
      <Box>
        <Box>{item.name} {item.price}</Box>
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
          <Text
            role="img"
            size="lg"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </Text>
        </Box>
      </Box>
    </Box>
    </Container>
  );
}

export default CartItem;