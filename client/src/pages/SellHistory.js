import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box, Image, Flex, Text, Button, Stack, Center, SimpleGrid, Link, Heading } from '@chakra-ui/react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries";

function SellHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;
  if (data) {
    user = data.user;
   }
   
   return (
    <Box>   
   <Flex height="100hv" alignItems="center" justifyContent="center">
     <Box m="20px">
       {user ? (
         <Box>
           <Heading as="h2">Sell History</Heading>
           <Box>
             {user.sales.map((order) => (
               <Box key={order._id} my={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                 <Text my={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                    {new Date(parseInt(order.purchaseDate)).toLocaleDateString()} to {order.buyerId}
                 </Text>

                 <Box d="flex" bg="gray.100" alignItems="top" justifyContent="center" >
                  {order.products.map(({ _id, image, name, price, quantity }, index) => (
                     <Box key={_id} padding="4" bg="gray.100" maxW="150px">
                       <Link as={ReactLink} to={`/products/${_id}`}>
                         <Image
                           alt={name}
                           src={`${image}`}
                         />
                         <Box>{quantity} {name}</Box>
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
             
       
      ) : (
        <Heading>No sales yet!</Heading>
      )}
     </Box>
                 
   </Flex>
   </Box> 
 )
  } 

export default SellHistory;