//dependencies
import React, { useEffect } from "react";
import { useMutation } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
//utilities
import { PURCHASE_SEEDS } from "../utils/mutations";
//chakra ui
import { Box, Flex, Stack, Container } from "@chakra-ui/react";

function SeedSuccess() {
    const [purchaseSeeds] = useMutation(PURCHASE_SEEDS);
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {

        async function saveOrder() {

          
          const pseeds = localStorage.getItem("seed");

          localStorage.removeItem("seed");

          purchaseSeeds({ variables: { seeds: parseFloat(pseeds) } });
  
          setTimeout(()=>{
              window.location.assign("/profile");
          },3000);

        }

        saveOrder();
    }, [purchaseSeeds]);

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