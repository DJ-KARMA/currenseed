import React, { useState } from "react";

import { Box, Image, Flex, Text, Button,Stack, Center, SimpleGrid } from "@chakra-ui/react";


const Home = () => {

  return (
    <Flex m="5">
      <Stack m="2" alignContent="center">
				<SimpleGrid columns={[2, null, 4]} gap={4}>
        <Box  p="5" maxW="320px" borderWidth="1px" borderRadius="12px" >
          <Image borderRadius="md" src="/images/beer-1.jpg" alt="Test"/>
            <Flex  mt={2}>
              <Text 
                textAlign="center"
                textTransform="uppercase"
                fontSize="xl"
                fontWeight="bold"
              >Craft Beers
              </Text>
            </Flex>
            <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
              Check out local vendors selling their craft beers
            </Text>
						<Flex mt={2} align="center">
              <Button 
								color={["brand.500"]} 
                size="lg"
                bg={["brand.800"]}
                _hover={{
                  bg: ["white"]
                }}
              >See More
          		</Button>
            </Flex>
        </Box>

				<Box p="5" maxW="320px" borderWidth="1px" borderRadius="12px" >
      <Image borderRadius="md" src="/images/produce-3.jpg" alt="Test"/>
      <Flex  mt={2}>
        <Text 
        textAlign="center"
          textTransform="uppercase"
          fontSize="xl"
          fontWeight="bold"
        >
          Fresh Produce
        </Text>
      </Flex>
      <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        Check out local farmers selling their fresh produce
      </Text>

      <Flex mt={2} align="center">
        <Button color={["brand.500"]} 
        size="lg"
        bg={["brand.800"]}
        _hover={{
          bg: ["white"]
            }}
          >See More</Button>
      </Flex>
    </Box>

    <Box p="5" maxW="320px" borderWidth="1px" borderRadius="12px" >
      <Image borderRadius="md" src="/images/jewelry-1.jpg" alt="Test"/>
      <Flex  mt={2}>
        <Text 
        textAlign="center"
          textTransform="uppercase"
          fontSize="xl"
          fontWeight="bold"
        >
          Handmade Jewelry
        </Text>
      </Flex>
      <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        Check out vendors selling their handmade jewelry
      </Text>

      <Flex mt={2} align="center">
        <Button color={["brand.500"]} 
        size="lg"
        bg={["brand.800"]}
        _hover={{
          bg: ["white"]
            }}
          >See More</Button>
      </Flex>
    </Box>


		<Box p="5" maxW="320px" borderWidth="1px" borderRadius="12px" >
      	<Image borderRadius="md" src="/images/cheese-2.jpg" alt="Test"/>
      	<Flex  mt={2}>
        	<Text 
        		textAlign="center"
          	textTransform="uppercase"
          	fontSize="xl"
          	fontWeight="bold"
        	>
          Artisan Cheese
        	</Text>
      	</Flex>
      	<Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        	Check out local vendors selling their artisan cheese
      	</Text>
      	<Flex mt={2}>
        	<Button
        		align="center" 
        		color={["brand.500"]} 
       	 		size="lg"
        		variant="outline"
						
        		bg={["white"]}
        	_	hover={{
          		bg: ["brand.800"]
            	}}
          >See More
					</Button>
      	</Flex>
    	</Box>


			<Box p="5" maxW="320px" borderWidth="1px" borderRadius="12px" >
      	<Image borderRadius="md" src="/images/meat-2.jpg" alt="Test"/>
      	<Flex  mt={2}>
        	<Text 
        		textAlign="center"
          	textTransform="uppercase"
          	fontSize="xl"
          	fontWeight="bold"
        	>
          Fresh Meat
        	</Text>
      	</Flex>
      	<Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        	Check out local vendors selling their fresh meats
      	</Text>
      	<Flex mt={2}>
        	<Button
        		align="center" 
        		color={["brand.500"]} 
       	 		size="lg"
        		variant="outline"
						
        		bg={["white"]}
        	_	hover={{
          		bg: ["brand.800"]
            	}}
          >See More
					</Button>
      	</Flex>
    	</Box>


			<Box p="5" maxW="320px" borderWidth="1px" borderRadius="12px" >
      	<Image borderRadius="md" src="/images/soap-2.jpg" alt="Test"/>
      	<Flex  mt={2}>
        	<Text 
        		textAlign="center"
          	textTransform="uppercase"
          	fontSize="xl"
          	fontWeight="bold"
        	>
          Handmade
        	</Text>
      	</Flex>
      	<Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        	Check out vendors selling handmade items
      	</Text>
      	<Flex mt={2}>
        	<Button
        		align="center" 
        		color={["brand.500"]} 
       	 		size="lg"
        		variant="outline"
						
        		bg={["white"]}
        	_	hover={{
          		bg: ["brand.800"]
            	}}
          >See More
					</Button>
      	</Flex>
    	</Box>



				</SimpleGrid>
      </Stack>

    </Flex>
    
  );
}

export default Home;