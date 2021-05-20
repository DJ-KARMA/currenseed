import React, { useEffect } from "react";
import { useMutation } from '@apollo/react-hooks';
import { ADD_ORDER} from "../utils/mutations";
import { idbPromise } from '../utils/helpers';
import { Box, Flex, Stack, Container } from "@chakra-ui/react";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const products = cart.map(item => item._id);
      
      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;
        alert(products);
    
        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }
        
      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

    //convert to Chakra 
    return (
      <Flex m="5" justifyContent="center">
			<Stack m="2" alignContent="center" >
				<Box fontSize="lg" align="center">
					<Container>
          🎉SUCCESS!🎉
					</Container>
					<Container>
          🙌Thank you for your purchase!🙌
					</Container>
					<Container>
						You will now be redirected back to the homepage. 
					</Container>
				</Box>
      </Stack>
      </Flex>

    );
  };

export default Success; 