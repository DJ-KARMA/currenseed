
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
//import { Link } from "react-router-dom";
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
                    seeds: Math.floor(Math.random()*20 + 1)
                }
            });
            const token = mutationResponse.data.addBuyer.token;
            Auth.login(token);
            alert("buyer added!")
        } else {  
            const mutationResponse = await addSeller({
                variables: {
                    email: formState.email, password: formState.password,
                    firstName: formState.firstName, lastName: formState.lastName,
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
                    <Heading>Signup</Heading>
                </Box>
                <Box my={4} textAlign="left">

                    <form onSubmit={handleFormSubmit}>

                        <FormControl isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                type="firstName"
                                placeholder="*******"
                                size="lg"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                type="lastName"
                                placeholder="*******"
                                size="lg"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="test@test.com"
                                size="lg"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired mt={6}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="*******"
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