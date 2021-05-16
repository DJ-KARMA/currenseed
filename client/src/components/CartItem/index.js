import React from 'react';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Button, Heading, Input, Image } from "@chakra-ui/react";

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
  //neeeds to be converted to Chakra 
  return (
    <Box>
      <Box boxSize="sm">
        <Image
          src={`/images/${item.image}`}
          alt=""
        />
      </Box>
      <Box>
        <Box>{item.name}, {item.price}</Box>
        <Box>
          <Text mb="8px">Qty:</Text>
          <Input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <Text
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default CartItem;