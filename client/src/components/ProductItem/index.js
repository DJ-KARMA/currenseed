//dependencies
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
//utilities
import { ADD_TO_CART, UPDATE_CART_QUANTITY, UPDATE_PRODUCTS } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import { DELETE_PRODUCT } from "../../utils/mutations";
//chakra ui
import { Box, Image, Badge, Text, Stack, Button, useToast } from "@chakra-ui/react";
import { QUERY_USER } from "../../utils/queries";


function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price,
    quantity,
    description,
    category,
    sellerId,
  } = item;

  const { data } = useQuery(QUERY_USER)
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  const toast = useToast();

  let userId;

  if (data) {
    userId = data.user._id;
  }

  console.log("userId", userId, "sellerId", sellerId, "productId", _id);

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
    toast({
      description: 'This item was added to your cart!',
      status: "success",
      isClosable: true,
    })
  }
  //let productId; 
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const removeFromKiosk = async event => {
    const mutationResponse = await deleteProduct({
      variables: {
        productId: _id
      }
    });
    console.log("mutationResponse.data.deleteProduct.products", mutationResponse.data.deleteProduct.products);

    if (mutationResponse) {
      toast({
        title: "Product delete.",
        description: "Your Product has been deleted from your kosik.",
        status: "success",
        isClosable: true,
      })
    }
    else {
      toast({
        title: "Product failed.",
        description: "Your Product could not be deleted from your kiosk.",
        status: "error",
        isClosable: true,
      })
    }

    dispatch({
      type: UPDATE_PRODUCTS,
      products: data.user.products
    });
  };


  return (
    <Box
      m="20px"
      w='300px'
      border='2px'
      borderColor='brand.900'
      rounded='20px'
      overflow='sm'
      bg='brand.700'>
      <Image boxSize='300px' roundedTop='20px' objectFit="cover" src={`${image}`} alt={name} />
      <Box p={5}>
        <Stack isInline align='baseline'>
          <Badge variant='solid' bg='brand.800' rounded='full' px={2}>
            {category.name}
          </Badge>
        </Stack>
        <Text as='h2' fontWeight='semibold' fontSize='xl' my={2}>
          {name}
        </Text>
        <Text isTruncated fontWeight='light' fontSize='md'>
          {description}
        </Text>
        <Stack isInline justify='space-between'>
          <Text fontWeight='semibold' fontSize='lg'>
            {price} 🌱
                    </Text>
          <Text as='h3' fontSize='lg' fontWeight='semibold'>

            {quantity} in stock
                    </Text>
        </Stack>
      </Box>

      <Box textAlign='center' paddingBottom={5}>
        {(sellerId !== userId) ?
          (<Button to="/cart" bg="#005C13" color='white' size='lg' mt={3} boxShadow='sm' onClick={addToCart}  >add to cart</Button>)

          : (
            (!categoryId) ?
              (<Button bg="red.500" color="white" size="lg" boxShadow="sm" onClick={removeFromKiosk}>remove from kiosk</Button>)
              :
              (<Text color="brand.500">It is your product</Text>)
          )
        }
      </Box>

    </Box>
  );
}

export default ProductItem;
