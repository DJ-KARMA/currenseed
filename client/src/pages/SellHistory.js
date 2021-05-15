import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Heading, Flex, Image, Text, Stack, Container, Center, Spacer, SimpleGrid} from "@chakra-ui/react";
// import { useQuery } from '@apollo/react-hooks';
// import { QUERY_USER } from "../utils/queries";
function SellHistory() {
//   const { data } = useQuery(QUERY_USER);
  let user;
  // if (data) {
  //   user = data.user;
  // }
  return (
        <Flex height="100hv" alignItems="center" justifyContent="center">
            <Box>
                {user ? (
                    <Box>
                    <Heading as="h2">Selling History for {user.firstName} {user.lastName}</Heading>
                        {user.orders.map((order) => (
                            <Box key={order.id}>
                                <Heading as="h3">{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</Heading>
                                {order.products.map(({ _id, image, name, price }, index) => (
                                    <Box>
                                    <Link as={`/products/${_id}`}>
                                    <Image alt={name} src={`/images/${image}`} />
                                    <Text>{name}</Text>
                                    </Link>
                                    <Text>${price}</Text>
                                    </Box>
                                ))}
                            </Box>
                             ))}
                    </Box>
                         ) : null  }
            </Box>
        </Flex>
  )
}