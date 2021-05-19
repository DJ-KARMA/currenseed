import React from "react";
import { Box, Image, Flex, Text, Button,Stack, Container, SimpleGrid } from "@chakra-ui/react";
import CategoryMenu from "../components/CategoryMenu"


const Home = () => {

  return (
	  	<CategoryMenu />
		// <Categories />
	)
	}


	const Categories = () => {
		const data = [
			{id: 1, title: "Craft Beers", content: "Check out local vendors selling their craft beers", src:"beer-1-min", alt:"Glass of beer on a table"},
			{id: 2, title: "Fresh Produce", content: "Check out local farmers selling their fresh produce", src:"produce-3-min", alt: "Oranges in a bowl and sliced on a table"},
			{id: 3, title: "Jewelry", content: "Check out vendors selling their handmade jewelry", src:"jewelry-1-min", alt: "Necklaces hanging, silver heart and two gold circular"},
			{id: 4, title: "Artisan Cheese", content: "Check out local vendors selling their artisan cheese", src:"cheese-2-min", alt: "Charcuterie board with assorted cheese, crackers and fruits"},
			{id: 5, title: "Fresh Meat", content: "Check out local vendors selling their fresh meats", src:"meat-2-min", alt: "Seasoned lamb racks on a baking tray"},
			{id: 6, title: "Handmade Items", content: "Check out vendors selling handmade items", src:"soap-2-min", alt:"Four handmade soap bars on a table"},
			{id: 7, title: "Baked Goods", content: "Check out vendors selling homemade baked items", src:"baked-goods-2-min", alt:"Six assorted cookies on a table"},
			{id: 8, title: "Wine", content: "Check out what local wineries have to offer", src:"wine-2-min", alt: "A glass of red and white wine on a table"}
		]
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
					{data.map((item, i) => {
						return <Box key={Math.random().toString(36).substr(2, 9)} p="5" maxW="320px" borderWidth="1px" borderRadius="12px"  >
								<Image  borderRadius="md" src= {`/images/${item.src}.jpg`} alt={item.alt}/>
									<Flex  mt={2} justifyContent="center">
										<Text 
											
											textTransform="uppercase"
											fontSize="xl"
											fontWeight="bold"
											>{item.title}
										</Text>
									</Flex>
										<Text   mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short" align="center">
											{item.content}
										</Text>
									<Flex mt={2} justifyContent="center">
										<Button
										
											as="a" 
											href={"/category/"+item.id}
											color={["brand.500"]} 
											size="lg"
											bg={["brand.800"]}
											_hover={{
												bg: ["white"]
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

