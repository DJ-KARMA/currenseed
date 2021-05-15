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
    setFirstName, 
    setLastName
} from '@chakra-ui/react';

export default function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addSeller] = useMutation(ADD_SELLER);
    const [addBuyer] = useMutation(ADD_BUYER);
  
    //need to work on this, if seller chosen mutation response = addSeller, if buyer chose mutation response = addBuyer
    const handleFormSubmit = async event => {
      event.preventDefault();
      const mutationResponse = await addSeller({
        variables: {
          email: formState.email, password: formState.password,
          firstName: formState.firstName, lastName: formState.lastName
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
                            <Checkbox colorScheme="red" defaultIsChecked>
                                Buyer
                            </Checkbox>
                            <Checkbox colorScheme="green" defaultIsChecked>
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