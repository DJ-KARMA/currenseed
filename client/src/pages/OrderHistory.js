//dependencies
import React from "react";
//utilities
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_USER_BY_ID } from "../utils/queries";
//chakra ui
import { Box, Image, Flex, Text, Heading } from '@chakra-ui/react';

export default function OrderHistory({ item }) {
  const { data } = useQuery(QUERY_USER);

  let user;

  if (data) {
    user = data.user;

    console.log("order",user);
  }

 return (
   <Box>   
  <Flex height="100hv" alignItems="center" justifyContent="center">
    <Box m ="20px">
      {user ? (
        <Box>
          <Heading as="h2">Purchase History for {user.firstName}</Heading> 
          <Box>
            {user.purchases.map((order) => (
              <Box key={order._id} mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">

                <Text my={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </Text>


                <Box d="flex" bg="gray.100" alignItems="top" justifyContent="center">
                  {order.products.map(({ _id, image, name, price, quantity }, index) => (
                    <Box key={_id} padding="4" bg="gray.100" maxW="150px" textAlign="center">
                        <Image
                          alt={name}
                          src={`${image}`}
                        />
                        <Box>{name}</Box>
                        <Box>
                        <Text>{price}🌱</Text>
                        </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
           </Box>
        </Box>
      ) : (
          <Heading>No orders yet!</Heading>
      )}
    </Box>              
  </Flex>
  </Box> 
)
 }  
