//dependencies
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
//utilities
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
//chakra ui 
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text
} from '@chakra-ui/react';

export default function Signup(props) {
    const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '', location: ''});
    const [addUser] = useMutation(ADD_USER);
    
    const handleFormSubmit = async event => {
      event.preventDefault();
            const mutationResponse = await addUser({
                variables: {
                    email: formState.email, password: formState.password,
                    firstName: formState.firstName, lastName: formState.lastName,
                    location: formState.location,
                    seeds: parseFloat(Math.random().toPrecision(2)* 10)
                }
            });
            const token = mutationResponse.data.addUser.token;
            Auth.login(token);
    };
  
    const handleChange = event => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value
      });
    };
 
    return (

        <Flex width="full" align="center" justifyContent="center" pb={8}>
            <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                <Box textAlign="center">
                    <Text>
                        <Link to="/login"> Login instead!</Link>
                    </Text> 
                    <Heading>Signup</Heading>
                </Box>
                <Box my={4} textAlign="left">

                    <form onSubmit={handleFormSubmit}>

                        <FormControl isRequired>
                            <FormLabel htmlFor="firstName">First Name</FormLabel>
                            <Input
                                type="firstName"
                                name="firstName"
                                id="firstName"
                                placeholder="*******"
                                size="lg"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="lastName">Last Name</FormLabel>
                            <Input
                                type="lastName"
                                name="lastName"
                                id="lastName"
                                placeholder="*******"
                                size="lg"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="test@test.com"
                                size="lg"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired mt={6}>
                            <FormLabel htmlFor="pwd">Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                id="pwd"
                                placeholder="*******"
                                size="lg"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="location">Location</FormLabel>
                            <Input
                                type="location"
                                name="location"
                                id="location"
                                placeholder="Niagara Region"
                                size="lg"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Button
                            color={["white"]} 
                            size="lg"
                            bg={["brand.800"]}
                                _hover={{
                                color: ["brand.500"]
                                }}
                            variant="outline"
                            type="submit"
                            width="full"
                            mt={4}
                        >
                            Sign In
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
};