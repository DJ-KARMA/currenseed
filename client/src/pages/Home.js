//dependencies
import React from "react";
import { useQuery } from '@apollo/react-hooks';
//utilities
import { QUERY_CATEGORIES } from "../utils/queries";
//chakra ui
import { Box, Image, Flex, Text, Button,Stack, Container, SimpleGrid } from "@chakra-ui/react";

const Home = () => {
const { data } = useQuery(QUERY_CATEGORIES);
  let categories = [];
  if (data) {
    categories = data.categories;
   }
   console.log(categories)

   return (
			
	<Flex m="5" justifyContent="center">
		<Stack m="2" alignContent="center" >
			<Box fontSize="lg" align="center">
				<Container>
					Currenseed is your local farmer’s market online.
				</Container>
				<Container>
					As a buyer you can shop from all the your local vendors in one convenient place from the comfort of your home.
				</Container>
				<Container>
					For all the vendors you can put all of your products online to be sold without having to travel to the market and setup.
				</Container>
				<Container>
					The more you buy/sell the more "Seeds" you will accumulate. Seeds can be used to purchase items and even used to promote your products on the homepage.
				</Container>
			</Box>
			
			<Box>
				<Container fontSize="3xl" align="center" fontWeight="bold" color="brand.500">Niagara Region</Container>
			</Box>

			<SimpleGrid columns={[1, null, 2, null, 4]} gap={4}>
				{categories.map((item, i) => {
					return <Box key={Math.random().toString(36).substr(2, 9)} p="5" maxW="320px" borderWidth="1px" borderRadius="12px"  >
							<Image  borderRadius="md" src= {item.image} alt={item.alt}/>
								<Flex  mt={2} justifyContent="center">
									<Text 
										
										textTransform="uppercase"
										fontSize="xl"
										fontWeight="bold"
										>{item.name}
									</Text>
								</Flex>
									<Text   mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short" align="center">
										{item.description}
									</Text>
								<Flex mt={2} justifyContent="center">
									<Button
									
										as="a" 
										href={"/category/"+item._id}
										color={["brand.500"]} 
										size="lg"
										bg={["brand.800"]}
										_hover={{
											bg: ["whitesmoke"]
											}}
										>
											See More
									</Button>
								</Flex>
						</Box>
					})}
				</SimpleGrid>
			</Stack>

		</Flex>
	)
	}

export default Home;

