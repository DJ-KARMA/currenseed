//dependencies
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
//utilities
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
//chakra ui
import { Box, Text, Input, Image } from "@chakra-ui/react";

const CartItem = ({ item }) => {

  const state = useSelector(state => state);
  
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
    <>
    <Box align='center'  m="20px" >
      <Box 

      align='center'
      w='150px'
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
        
      </Box>
    </Box>
    </>
  );
}

export default CartItem;