//dependencies
import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
//utilities
import { QUERY_USER } from "../utils/queries";
//chakra ui 
import { Box, Image, Flex, Text, Link, Heading } from '@chakra-ui/react';

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
           <Heading as="h2">Sell History for {user.firstName}</Heading>
           <Box>
             {user.sales.map((order) => (
               <Box key={order._id} my={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                 <Text my={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                    {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                 </Text>

                 <Box d="flex" bg="gray.100" alignItems="top" justifyContent="center" >
                  {order.products.map(({ _id, image, name, price, quantity }, index) => (
                     <Box key={_id} padding="4" bg="gray.100" maxW="150px" textAlign="center">
                       <Link as={ReactLink} to={`/products/${_id}`}>
                         <Image
                           alt={name}
                           src={`${image}`}
                         />
                         <Box>{name}</Box>
                       </Link>
                       <Box>
                        <Text>QTY: {quantity}</Text>
                        </Box>
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