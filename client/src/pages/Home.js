import React, { useState } from "react";

import { Box, Image, Flex, Text, Button,Stack, Container, SimpleGrid } from "@chakra-ui/react";



const Home = () => {

  return (

    <Flex m="5" justifyContent="center">
 			        

      <Stack m="2" alignContent="center">
			<Box>
		<Container w={[300, 400, 560]}>Currenseed is an online farmer’s market. There is no real world currency here. Products are paid for using “seeds” which can be purchased via credit card, earned by doing certain tasks such as logging in, and by interacting with the website (ie. Buying and making sales). Buyer’s can browse kiosks based on their location, to ensure that they are able to buy fresh produce and other items locally.</Container>
			
			</Box>

			<Box>
				<Container fontSize="3xl" align="center" fontWeight="bold" color="brand.500">Niagara Region</Container>
			</Box>
				<SimpleGrid columns={[1, null, 2, null, 4]} gap={4}>
        <Box  p="5" maxW="320px" borderWidth="1px" borderRadius="12px" >
          <Image borderRadius="md" src="/images/beer-1.jpg" alt="Test"/>
            <Flex  mt={2} justifyContent="center">
              <Text 
                textTransform="uppercase"
                fontSize="xl"
                fontWeight="bold"
              >Craft Beers
              </Text>
            </Flex>
            <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short" align="center">
              Check out local vendors selling their craft beers
            </Text>
						<Flex mt={2} justifyContent="center">
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
      <Flex  mt={2} justifyContent="center">
        <Text 
          textTransform="uppercase"
          fontSize="xl"
          fontWeight="bold"
        >
          Fresh Produce
        </Text>
      </Flex>
      <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short" align="center">
        Check out local farmers selling their fresh produce
      </Text>

      <Flex mt={2} justifyContent="center">
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
      <Flex  mt={2} justifyContent="center">
        <Text 
          textTransform="uppercase"
          fontSize="xl"
          fontWeight="bold"
        >
          Handmade Jewelry
        </Text>
      </Flex>
      <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short" align="center">
        Check out vendors selling their handmade jewelry
      </Text>

      <Flex mt={2} justifyContent="center">
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
      	<Flex  mt={2} justifyContent="center">
        	<Text 
          	textTransform="uppercase"
          	fontSize="xl"
          	fontWeight="bold"
        	>
          Artisan Cheese
        	</Text>
      	</Flex>
      	<Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short" align="center">
        	Check out local vendors selling their artisan cheese
      	</Text>
      	<Flex mt={2} justifyContent="center">
        	<Button
        		align="center" 
        		color={["brand.500"]} 
       	 		size="lg"
        		variant="outline"
						
        		bg={["white"]}
        	_hover={{
          		bg: ["brand.800"]
            	}}
          >See More
					</Button>
      	</Flex>
    	</Box>


			<Box p="5" maxW="320px" borderWidth="1px" borderRadius="12px" >
      	<Image borderRadius="md" src="/images/meat-2.jpg" alt="Test"/>
      	<Flex  mt={2} justifyContent="center">
        	<Text 
          	textTransform="uppercase"
          	fontSize="xl"
          	fontWeight="bold"
        	>
          Fresh Meat
        	</Text>
      	</Flex>
      	<Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short" align="center">
        	Check out local vendors selling their fresh meats
      	</Text>
      	<Flex mt={2} justifyContent="center">
        	<Button
        		align="center" 
        		color={["brand.500"]} 
       	 		size="lg"
        		variant="outline"
						
        		bg={["white"]}
        	_hover={{
          		bg: ["brand.800"]
            	}}
          >See More
					</Button>
      	</Flex>
    	</Box>


			<Box p="5" maxW="320px" borderWidth="1px" borderRadius="12px" >
      	<Image borderRadius="md" src="/images/soap-2.jpg" alt="Test"/>
      	<Flex  mt={2} justifyContent="center">
        	<Text 
          	textTransform="uppercase"
          	fontSize="xl"
          	fontWeight="bold"
        	>
          Handmade
        	</Text>
      	</Flex>
      	<Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short" align="center">
        	Check out vendors selling handmade items
      	</Text>
      	<Flex mt={2} justifyContent="center">
        	<Button
        		align="center" 
        		color={["brand.500"]} 
       	 		size="lg"
        		variant="outline"
						
        		bg={["white"]}
        	_hover={{
          		bg: ["brand.800"]
            	}}
          >See More
					</Button>
      	</Flex>
    	</Box>

			<Box p="5" maxW="320px" borderWidth="1px" borderRadius="12px" >
      	<Image borderRadius="md" src="/images/baked-goods-2.jpg" alt="Test"/>
      	<Flex  mt={2} justifyContent="center">
        	<Text 
          	textTransform="uppercase"
          	fontSize="xl"
          	fontWeight="bold"
        	>
          Baked Goods
        	</Text>
      	</Flex>
      	<Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short" align="center">
        	Check out vendors selling homemade baked items
      	</Text>
      	<Flex mt={2} justifyContent="center">
        	<Button
        		align="center" 
        		color={["brand.500"]} 
       	 		size="lg"
        		variant="outline"
						
        		bg={["white"]}
        	_hover={{
          		bg: ["brand.800"]
            	}}
          >See More
					</Button>
      	</Flex>
    	</Box>


			<Box p="5" maxW="320px" borderWidth="1px" borderRadius="12px" >
      	<Image borderRadius="md" src="/images/beer-2.jpg" alt="Test"/>
      	<Flex  mt={2} justifyContent="center">
        	<Text 
          	textTransform="uppercase"
          	fontSize="xl"
          	fontWeight="bold"
        	>
          Wine
        	</Text>
      	</Flex>
      	<Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short" align="center">
        	Check out what local wineries have to offer
      	</Text>
      	<Flex mt={2} justifyContent="center">
        	<Button
        		align="center" 
        		color={["brand.500"]} 
       	 		size="lg"
        		variant="outline"
						
        		bg={["white"]}
        	_hover={{
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

