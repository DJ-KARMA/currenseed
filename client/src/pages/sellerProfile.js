import React from "react";
import { useDispatch, useSelector } from 'react-redux';

//import ProductItem from "./
import OrderHistory from "../pages/OrderHistory";
import SellHistory from "../pages/SellHistory";
import ProductList from "../components/ProductList";

import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries";
import { UPDATE_PRODUCTS } from "../utils/actions"

import { Link as ReactLink } from "react-router-dom";
import { Box, Image, Flex, Text, Divider, Stack, Center, SimpleGrid, Link, Heading } from '@chakra-ui/react';

function SellerProfile(props) {
    const { loading, data } = useQuery(QUERY_USER);
    let user;

    if (data) {
         user = data.user;
    }

    return (
        <Box>   
            <Box margin={10}>
                <Flex height="100hv" alignItems="top" justifyContent="space-between">  
                    <Box>   
                        <Text m={2} fontSize="xx-large" fontWeight="semibold" lineHeight="short">
                            {/* {user.firstName}'s Kiosk */}
                        </Text>
                        <Text m={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                            {/* Location: {user.location} */}
                        </Text>
                    </Box>
                    <Text m={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                        {/* Seeds: {user.seeds}  */}
                    </Text>
                </Flex>
            </Box>
            <Divider orientation="horizontal" />

            <Box d="flex" height="100hv" alignItems="top" justifyContent="space-around" flexWrap="wrap">
                <Heading as="h2">Products Available:</Heading>
            </Box>
            
            <Box d="flex" height="100hv" alignItems="top" justifyContent="space-around" flexWrap="wrap">
                <Box minWidth="450px" textAlign="center">
                    <Box borderWidth="1px" width="90%" minHeight="300px" padding="10px" my="20px" mx="auto" textAlign="center">
                        <OrderHistory></OrderHistory>
                    </Box>
                </Box> 

                <Box minWidth="450px" textAlign="center">
                    <Box borderWidth="1px" width="90%" minHeight="400px" padding="10px" my="20px" mx="auto" textAlign="center">
                        <SellHistory></SellHistory>
                    </Box>
                </Box>

            </Box>
        </Box> 
    )
}; 

export default SellerProfile;
