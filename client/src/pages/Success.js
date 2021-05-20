
import React, { useEffect } from "react";
import { useMutation } from '@apollo/react-hooks';
import { PURCHASE_SEEDS } from "../utils/mutations";
import { Box, Text, Input, Image, Button, Heading } from "@chakra-ui/react";
import { idbPromise } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import {PURCHASE_SEED} from '../utils/actions';

function Success() {
    const [purchaseSeeds] = useMutation(PURCHASE_SEEDS);
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {

        async function saveOrder() {

          
          const pseeds = localStorage.getItem("seed");

          localStorage.removeItem("seed");

          purchaseSeeds({ variables: { seeds: parseFloat(pseeds) } });


          // const products = cart.map(item => item._id);
          // if (products.length) 
          // {
          //     const { data } = await addOrder({ variables: { products } });
          //     const productData = data.addOrder.products;
          
          //     productData.forEach((item) => {
          //         idbPromise('cart', 'delete', item);
          //     });
          // }
  
          setTimeout(()=>{
              window.location.assign("/");
          },3000);

        }

        saveOrder();
    }, [purchaseSeeds]);
    //convert to Chakra 
    return (
      <Box m="30px">
          <Heading as="h1" m="20px">Success!</Heading>
          <Text as="h2" m="20px">
            Thank you for your purchase!
            </Text>
          <Text as="h2" m="20px">
            You will now be redirected to the homepage
            </Text>
      </Box>
    );
  };

export default Success; 