import React from "react";
import { Button, Box, Flex, Text, Stack, Container, Center, Spacer, SimpleGrid} from "@chakra-ui/react";




const Footer = () => {

    return (
       
            <FooterLinks>

            </FooterLinks>
    )
}

const FooterLinks = () => {
    return (

<Flex justifyContent="center" bg="brand.600" width="100%">
       <Box>
           <Container align="center"pb="3" fontSize="xl">CONTRIBUTORS</Container>
        
        <SimpleGrid columns={[3, null, 4]} gap={4}>
            <Button
            as="a" 
            href="https://github.com/malloryfaria"
            target="_blank"
            color={["white"]} 
            size="lg"
            bg={["brand.800"]}
            _hover={{
                color: ["brand.500"]
            }}
            >Mallory Faria
            </Button>
            <Button
                as="a" 
                href="https://github.com/dvicj"
                target="_blank"            
                color={["white"]} 
                size="lg"
                bg={["brand.800"]}
                _hover={{
                    color: ["brand.500"]
                }}                
            >Devin Jones
            </Button>
            <Button
                as="a" 
                href="https://github.com/Kgroll"
                target="_blank"             
                color={["white"]} 
                size="lg"
                bg={["brand.800"]}
                _hover={{
                    color: ["brand.500"]
                }}
                >Kristen Groller
            </Button>
            <Button
                as="a" 
                href="https://github.com/raedaltaki"
                target="_blank"             
                color={["white"]} 
                size="lg"
                bg={["brand.800"]}
                _hover={{
                    color: ["brand.500"]
                }}
                >Raed Altaki
            </Button>
            <Button
                as="a" 
                href="https://github.com/matthewAbianco"
                target="_blank" 
                color={["white"]} 
                size="lg"
                bg={["brand.800"]}
                _hover={{
                    color: ["brand.500"]
                }}
                >Matthew Bianco
            </Button>
            <Button
                as="a" 
                href="https://github.com/cerafinn"
                target="_blank" 
                color={["white"]} 
                size="lg"
                bg={["brand.800"]}
                _hover={{
                    color: ["brand.500"]
                }}
                >Andaleeb Farooq
            </Button>
            <Button
                as="a" 
                href="https://github.com/jshallcross"
                target="_blank" 
                color={["white"]} 
                size="lg"
                bg={["brand.800"]}
                _hover={{
                    color: ["brand.500"]
                }}
                >Jon Shallcross
            </Button>
            <Button
                as="a" 
                href="https://github.com/hayleyvuylsteke"
                target="_blank" 
                color={["white"]} 
                size="lg"
                bg={["brand.800"]}
                _hover={{
                    color: ["brand.500"]
                }}
                >Hayley Vuylsteke
            </Button>
    
            
      </SimpleGrid>
      <Container align="center">©2021 Copyright CurrenSeed</Container> 
      </Box>
      </Flex>
    )
}



export default Footer;