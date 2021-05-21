import React, { useEffect } from "react";
import { useMutation } from '@apollo/react-hooks';
import { PURCHASE_SEEDS } from "../utils/mutations";
import { Box, Text, Input, Image, Button, Heading, Flex, Stack, Container } from "@chakra-ui/react";
import { idbPromise } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import {PURCHASE_SEED} from '../utils/actions';

function SeedSuccess() {
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
              window.location.assign("/profile");
          },3000);

        }

        saveOrder();
    }, [purchaseSeeds]);

    //convert to Chakra 
    return (
      <Flex m="5" justifyContent="center">
			<Stack m="2" alignContent="center" >
				<Box fontSize="lg" align="center">
					<Container>
          🎉SUCCESS!🎉
					</Container>
					<Container>
          🙌Thank you for purchasing seeds!🙌
					</Container>
					<Container>
						You will now be redirected back to your profile. 
					</Container>
				</Box>
      </Stack>
      </Flex>

    );
  };

export default SeedSuccess; 