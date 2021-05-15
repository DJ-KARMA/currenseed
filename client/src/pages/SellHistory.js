import React from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Flex, Image, Text} from "@chakra-ui/react";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_SELLER } from "../utils/queries";

function SellHistory() {
  const { data } = useQuery(QUERY_SELLER);
  let seller;
  if (data) {
    seller = data.seller;
   }
  return (
        <Flex height="100hv" alignItems="center" justifyContent="center">
            <Box>
                {seller ? (
                    <Box>
                    <Heading as="h2">Selling History for {seller.firstName} {seller.lastName}</Heading>
                        {seller.orders.map((order) => (
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

export default SellHistory;