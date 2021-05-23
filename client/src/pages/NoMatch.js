//dependencies
import React from "react";
import { Box, Flex, Text, Heading } from '@chakra-ui/react';

const NoMatch = () => {
  return (
    <Box>
    <Flex height="100hv" alignItems="center" justifyContent="center">
        <Heading as="h2">You're super lost...</Heading>
        <Heading as="h2">
          <Text role="img" aria-label="sad leaves">
          😢🍃
          </Text>
        </Heading>
        </Flex>
    </Box>
  );
};

export default NoMatch;