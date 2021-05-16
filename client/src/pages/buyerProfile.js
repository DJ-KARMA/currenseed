
import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box, Image, Flex, Text, Divider, Stack, Center, SimpleGrid, Link, } from '@chakra-ui/react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_BUYER } from "../utils/queries";

function buyerProfile() {
    const { data } = useQuery(QUERY_BUYER);
    let user;

    if (data) {
        user = data.user;
    }

    // user={
    //     _id :"1",
    //     firstName:"Raed",
    //     lastName: "Altaki",
    //     email:"raed@hotmail.com",
    //     purchases:
    //     [
    //         {
    //             _id:"2",
    //             purchaseDate:"05-15-2021",
    //             products:
    //             [
    //                 {
    //                     _id:"3",
    //                     name:"apple",
    //                     description:"",
    //                     image:"",
    //                     quantity:"",
    //                     price: 30
    //                 },
    //                 {
    //                     _id:"3",
    //                     name:"apple",
    //                     description:"",
    //                     image:"",
    //                     quantity:"",
    //                     price: 30
    //                 }
    //             ],
    //             sellerId: "4",
    //             buyerId: "1"
    //         },
    //         {
    //             _id:"2",
    //             purchaseDate:"05-15-2021",
    //             products:
    //             [
    //                 {
    //                     _id:"3",
    //                     name:"apple",
    //                     description:"",
    //                     image:"",
    //                     quantity:"",
    //                     price: 30
    //                 }
    //             ],
    //             sellerId: "4",
    //             buyerId: "1"
    //         }
    //     ],
    //     seeds :50
    // };

    return (
        <Box>   
            <Box>
                <Flex height="100hv" alignItems="top" justifyContent="space-between">  
                    <Box>   
                        <Text m={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                            Profile for {user.firstName} {user.lastName}
                        </Text>
                        <Text m={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                            Location: 
                        </Text>
                    </Box>
                    <Text m={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                        seeds: {user.seeds}
                    </Text>
                </Flex>
            </Box>
            <Divider orientation="horizontal" />
            <Flex height="100hv" alignItems="center" justifyContent="center">
                <Box width="100%" textAlign="center">
                   <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                        Order History
                    </Text>
                    <Box border="1px" width="90%" padding="10px" my="20px" mx="auto" textAlign="center">
                        {/* <orderHistory/> */}
                        {user.purchases.map((order) => (
                            <Box key={order._id} mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                                <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                                    {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                                </Text>
                                <Box d="flex" alignItems="baseline">
                                    {order.products.map(({ _id, image, name, price }, index) => (
                                        <Box key={index} padding="4" bg="gray.100" maxW="3xl">
                                            <Link as={ReactLink} to={`/products/${_id}`}>
                                                <Image
                                                alt={name}
                                                src={`/images/${image}`}
                                                />
                                                <Box>{name}</Box>
                                            </Link>
                                            <Box>
                                                <Text>${price}</Text>
                                            </Box>
                                        </Box>
                                    ))}         
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

            </Flex>
        </Box> 
    )
}; 

export default buyerProfile;
