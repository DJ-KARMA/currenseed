//dependencies
import React from "react";
//chakra ui
import { Button, Box, Flex, Container, SimpleGrid} from "@chakra-ui/react";

const Footer = () => {

    return (
            <FooterLinks>
            </FooterLinks>
    )
}

const FooterLinks = () => {

    const data = [
        {name: 'Mallory Faria', username: 'malloryfaria'},
        {name: 'Devin Jones', username: 'dvicj'},
        {name: 'Kristen Groller', username: 'Kgroll'},
        {name: 'Raed Altaki', username: 'raedaltaki'},
        {name: 'Matthew Bianco', username: 'matthewAbianco'},
        {name: 'Andaleeb Farooq', username: 'cerafinn'},
        {name: 'Jon Shallcross', username: 'jshallcross'},
        {name: 'Hayley Vuylsteke', username: 'hayleyvuylsteke'}
    ];

    return(
        <Flex justifyContent="center" bg="brand.600" width="100%">
            <Box>
                <Container align="center"pb="3" fontSize="xl">CONTRIBUTORS</Container>
                    <SimpleGrid columns={[3, null, 4]} gap={4}>
                        {data.map((item, i) => {
                            return <Button
                            key={i}
                                fontSize="14px"
                                as="a" 
                                href={`https://github.com/${item.username}`}
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