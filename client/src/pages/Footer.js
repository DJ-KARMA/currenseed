import React from "react";
import { Button, Box, Flex, Container, SimpleGrid, } from "@chakra-ui/react";





const Footer = () => {

    return (
            <FooterLinks>
            </FooterLinks>
    )
}

const FooterLinks = () => {

    const data = [
        {name: 'Mallory Faria', username: 'malloryfaria',key: 1},
        {name: 'Devin Jones', username: 'dvicj', key: 2},
        {name: 'Kristen Groller', username: 'Kgroll', key: 3},
        {name: 'Raed Altaki', username: 'raedaltaki', key: 4},
        {name: 'Matthew Bianco', username: 'matthewAbianco', key: 5},
        {name: 'Andaleeb Farooq', username: 'cerafinn', key: 6},
        {name: 'Jon Shallcross', username: 'jshallcross', key: 7},
        {name: 'Hayley Vuylsteke', username: 'hayleyvuylsteke', key: 8}
    ];

    return(
        <Flex justifyContent="center" bg="brand.600" width="100%">
            <Box>
                <Container align="center"pb="3" fontSize="xl">CONTRIBUTORS</Container>
                    <SimpleGrid columns={[3, null, 4]} gap={4}>
                        {data.map(item => {
                            return<Button
                                key={item.key}
                                as="a" 
                                href="https://github.com/{item.username}"
                                target="_blank"
                                color={["white"]} 
                                size="lg"
                                bg={["brand.800"]}
                                    _hover={{
                                    color: ["brand.500"]
                                    }}
                                >{item.name}
                            </Button>


                            
                        })}
                    </SimpleGrid>
                <Container align="center">©2021 Copyright CurrenSeed</Container> 
            </Box>
        </Flex>
    )
}



export default Footer;