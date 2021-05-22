//dependencies
import React, { useEffect } from "react";
import { useMutation } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
//utilities
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { ADD_ORDER, SPEND_SEEDS } from "../../utils/mutations";
import { idbPromise } from "../../utils/helpers";
//chakra ui
import { Box, Text, Input, Image, Container} from "@chakra-ui/react";

const CartItem = ({ item }) => {

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  localStorage.setItem("seeds", item.price);

   const [addOrder] = useMutation(ADD_ORDER);
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

      useEffect(() => {
          async function saveOrder() {

              const sseeds = localStorage.getItem("seeds");

              localStorage.removeItem("seeds");

              spendSeeds({ variables: {seeds: parseFloat(sseeds)} })

              const cart = await idbPromise('cart', 'get');
              const products = cart.map(item => item._id);
              if (products.length) {
                  const { data } = await addOrder({ variables: { products } });
                  const productData = data.addOrder.products;
                  productData.forEach((item) => {
                    idbPromise('cart', 'delete', item);
                  });
              }
            setTimeout(()=>{
                window.location.assign("/orderHistory");
            },7000);
          }
  
          saveOrder();
      }, [spendSeeds, addOrder]);
      
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
        <Box>{item.name}</Box>
        <Box> Seeds: {item.price}</Box>
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