import React,{useState, useEffect} from 'react';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY , PURCHASE_SEED} from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Input, Image, Button, Heading } from "@chakra-ui/react";
import Auth from '../../utils/auth';
import { useLazyQuery } from '@apollo/react-hooks';
import {  QUERY_CHECKOUT} from "../../utils/queries";
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


const SeedItem = () => {

  const state = useSelector(state => state);
  const dispatch = useDispatch();


  const [total,updateTotal] = useState(0);
  const handleChange = event => {
    const { value } = event.target;
      updateTotal(value);
  };

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  function submitCheckout() {    

      localStorage.setItem("seed", total);

      getCheckout({
          variables: { price: total, quantity: total }
      });
  }
  
  useEffect(() => {

    console.log("state",state);
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  return (
    <Box align="center"  d="flex" justifyContent="center" alignItems="center">
      <Box align='center' m="30px" width="500px">
        <Box 
        align='center'
        w='300px'
        border='2px'
        borderColor= 'brand.900'
        overflow='sm'
        bg='brand.700'>
          <Image
            src={`images/flower-1-min.jpg`}
            alt=""
          />
        </Box>
        <Box>
          <Box>1 Seed = $1</Box>
          <Box>
            <Text mb="8px" align="center">Qty:</Text>
            <Input
            w="70px"
            alignContent="center"
              type="number"
              placeholder="1000"
              onChange={handleChange}
              />
          </Box>
        </Box>
      </Box>
      <Box  width="300px" m="30px">
        <Heading>Seeds: ${total?total:0}</Heading>
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
    </Box>
  );
}

export default SeedItem;