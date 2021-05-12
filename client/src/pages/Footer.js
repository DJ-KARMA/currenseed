import React from "react";
import { Button, Box, Flex, Text, Stack, Container, Icon, Center, Spacer, SimpleGrid} from "@chakra-ui/react";
import { BREAK } from "graphql";



const Footer = () => {

    return (
       
            <FooterLinks>

            </FooterLinks>
       
        

        

    )
}

const FooterLinks = () => {
    return (
   
<Flex justifyContent="center">
       <Box>
           <Container align="center"pb="3" fontSize="xl">CONTRIBUTORS</Container>
        
        <SimpleGrid columns={4} gap={4}>
            <Button
            color={["white"]} 
            size="lg"
            bg={["brand.800"]}
            _hover={{
                color: ["brand.500"]
            }}
            >Mallory Faria
            </Button>
            <Button
                color={["white"]} 
                size="lg"
                bg={["brand.800"]}
                _hover={{
                    color: ["brand.500"]
                }}                
            >Devin Jones
            </Button>
            <Button
                color={["white"]} 
                size="lg"
                bg={["brand.800"]}
                _hover={{
                    color: ["brand.500"]
                }}
                >Kristen Groller
            </Button>
            <Button
                color={["white"]} 
                size="lg"
                bg={["brand.800"]}
                _hover={{
                    color: ["brand.500"]
                }}
                >Raed Altaki
            </Button>
            <Button
                color={["white"]} 
                size="lg"
                bg={["brand.800"]}
                _hover={{
                    color: ["brand.500"]
                }}
                >Allen Lovatt
            </Button>
            <Button
                color={["white"]} 
                size="lg"
                bg={["brand.800"]}
                _hover={{
                    color: ["brand.500"]
                }}
                >Andaleeb Farooq
            </Button>
            <Button
                color={["white"]} 
                size="lg"
                bg={["brand.800"]}
                _hover={{
                    color: ["brand.500"]
                }}
                >Jon Shallcross
            </Button>
            <Button
                color={["white"]} 
                size="lg"
                bg={["brand.800"]}
                _hover={{
                    color: ["brand.500"]
                }}
                >Hayley Vuylsteke
            </Button>
            <Button
                color={["white"]} 
                size="lg"
                bg={["brand.800"]}
                _hover={{
                    color: ["brand.500"]
                }}
                >Shaylen Naidu
            </Button>
    
            
      </SimpleGrid> 
      </Box>
      </Flex>
    )
}

const FooterTitle = () => {
    return (
        <Box>
        <Container>CONTRIBUTORS</Container>
    </Box>
    )
}


export default Footer;