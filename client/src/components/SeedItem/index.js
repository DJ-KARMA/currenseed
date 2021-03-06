//dependencies
import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/react-hooks';
//utilities
import Auth from '../../utils/auth';
import {QUERY_CHECKOUT} from "../../utils/queries";
//stripe functionality
import { loadStripe } from '@stripe/stripe-js';
//chakra ui 
import { Box, Text, Input, Image, Button, Heading } from "@chakra-ui/react";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


const SeedItem = () => {

  const state = useSelector(state => state);

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
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data, state]);

  return (
    <Box align="center"  d="flex" justifyContent="center" alignItems="center">
      <Box align='center' m="30px" width="500px">
        <Box 
        align='center'
        w='200px'
        border='2px'
        borderColor= 'brand.900'
        overflow='sm'
        bg='brand.700'>
          <Image
            src={`images/flowers-1-min.jpg`}
            alt=""
          />
        </Box>
        <Box>
          <Box>1 🌱 = $1</Box>
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
        <Heading>{total?total:0}🌱= ${total?total:0}</Heading>
        {
          Auth.loggedIn() ?
            <Button 
            m="20px"
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