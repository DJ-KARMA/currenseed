
import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box, Image, Flex, Text, Button, Stack, Center, SimpleGrid, Link } from '@chakra-ui/react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries";

 export default function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

return (
   <Box>   
         <Link as={ReactLink} to="/">
           ← Back to Products
         </Link>
       

  <Flex height="100hv" alignItems="center" justifyContent="center">
    <Box>
      {user ? (
        <Box>
          <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
            Order History for {user.firstName} {user.lastName}
          </Text>
          <Box>
            {user.orders.map((order) => (
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
                  ))
                  }         
                </Box>
              </Box>
            ))}
          // </Box>
        </Box>
            
      
      ) : null }
                </Box>
                
  </Flex>
  </Box> 
)
 }  
