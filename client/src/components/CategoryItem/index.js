import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box, Text, Input, Image } from "@chakra-ui/react";

function CategoryItem(item) {
  const {
    name,
    description,
    image,
    price,
    quantity,
    category,
    _id,
  } = item;
  //needs to be converted to Chakra
  return (
    <Box boxSize="sm">
        <Link as={ReactLink}to={`/products/${_id}`}>
        <Image
          alt={name}
          src={`/images/${image}`}
        />
        <Text>{name}</Text>
        <Text>{description}</Text>
      </Link>
      <Box>
        <Box>{quantity} in stock</Box>
        <Text>${price}</Text>
      </Box>
    </Box>
  );
}

export default CategoryItem;
