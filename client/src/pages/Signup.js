
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { ADD_SELLER, ADD_BUYER } from "../utils/mutations"
import Auth from "../utils/auth";

import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Checkbox,
    Stack,
    Text
    //setFirstName, 
    //setLastName
} from '@chakra-ui/react';

export default function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addSeller] = useMutation(ADD_SELLER);
    const [addBuyer] = useMutation(ADD_BUYER);
    const choice = []; 
  
    const handleChoice = event => {
        //get checked value
        const checkedValue = event.target.value; 
        //push to empty array 
        choice.pop(checkedValue);
    }
    
    const handleFormSubmit = async event => {
      event.preventDefault();

        if (choice[0] === "Buyer") {
            const mutationResponse = await addBuyer({
                variables: {
                    email: formState.email, password: formState.password,
                    firstName: formState.firstName, lastName: formState.lastName,
                    location: formState.location,
                    seeds: Math.floor(Math.random()*20 + 1)
                }
            });
            const token = mutationResponse.data.addBuyer.token;
            Auth.login(token);
            console.log(token);
        } else {  
            const mutationResponse = await addSeller({
                variables: {
                    email: formState.email, password: formState.password,
                    firstName: formState.firstName, lastName: formState.lastName,
                    location: formState.location,
                    seeds: Math.floor(Math.random()*20 + 1)
                }
            });
            const token = mutationResponse.data.addSeller.token;
            Auth.login(token);
        }
    };
  
    const handleChange = event => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value
      });
    };
 
    return (

        <Flex width="full" align="center" justifyContent="center">
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
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="*******"
                                size="lg"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired mt={6}>
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
                        <Stack spacing={10} direction="row">
                            <Checkbox 
                            colorScheme="red" 
                            //defaultIsChecked
                            name="Buyer"
                            value="Buyer"
                            onChange={handleChoice}
                            >
                                Buyer
                            </Checkbox>
                            <Checkbox 
                            colorScheme="green" 
                            //defaultIsChecked
                            name="Seller"
                            value="Seller"
                            onChange={handleChoice}
                            >
                                Seller
                            </Checkbox>
                        </Stack>

                        <Button
                            variantColor="teal"
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