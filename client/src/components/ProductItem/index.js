import React from "react";
import { Link } from "react-router-dom";
//import { pluralize } from "../../utils/helpers"
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import { useSelector, useDispatch } from 'react-redux';


import {Box , Image, Badge, Text, Stack, Button} from "@chakra-ui/react";


function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price,
    quantity,
    description,
    category,
    userId
  } = item;

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const { cart } = state;

  const addToCart = () => {
    // find the cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
  
    // if there was a match, call UPDATE with a new purchase quantity
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <Box
        w='300px'
        border='2px'
        borderColor= 'brand.900'
        rounded='20px'
        overflow='sm'
        bg='brand.700'>
        <Link to={`/products/${_id}`}>
            <Image boxSize='300px' roundedTop='20px' objectFit="cover" src={`/images/${image}`} alt={name} />
            <Box p={5}>
                <Stack isInline align='baseline'>
                    <Badge variant='solid' bg='brand.800' rounded='full' px={2}>
                        {category}
                    </Badge>
                    <Text
                        textTransform='uppercase'
                        fontSize='sm'
                        color='gray.500'
                        letterSpacing='wide'>
                        {userId}
                    </Text>
                </Stack>
                <Text as='h2' fontWeight='semibold' fontSize='xl' my={2}>
                    {name}
                </Text>
                <Text isTruncated fontWeight='light' fontSize='md'>
                    {description}
                </Text>
                <Stack isInline justify='space-between'>
                    <Text fontWeight ='semibold' fontSize='lg'>
                        ${price}
                    </Text>
                    <Text as='h3' fontSize='lg' fontWeight='semibold'>
                        {quantity} {/*pluralize("item", quantity)*/} in stock
                    </Text>
                </Stack>
            </Box>
        </Link>
        <Box textAlign='center' paddingBottom={5}>
            <Button bg="#005C13" color='white' size='lg' mt={3} boxShadow='sm' onClick={addToCart}>add to cart</Button>
        </Box>
    </Box>
  );
}

export default ProductItem;
