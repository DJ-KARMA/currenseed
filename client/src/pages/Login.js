
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { LOGIN_BUYER, LOGIN_SELLER } from "../utils/mutations"
import Auth from "../utils/auth";

import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  CircularProgress,
  isLoggedIn, 
  setIsLoggedIn, 
  //ErrorMessage,
  isLoading
} from '@chakra-ui/react';

export default function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' })
    const [buyerLogin, { error }] = useMutation(LOGIN_BUYER);
  
    const handleFormSubmit = async event => {
      event.preventDefault();
      try {
        const mutationResponse = await buyerLogin({ variables: { email: formState.email, password: formState.password } })
        const token = mutationResponse.data.buyerLogin.token;
        Auth.login(token);
      } catch (e) {
        console.log(e)
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
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          {isLoggedIn ? (
            <Box textAlign="center">
              <Text>logged in!</Text>
              <Button
                variantColor="orange"
                variant="outline"
                width="full"
                mt={4}
                onClick={() => setIsLoggedIn(false)}
              >
                Sign out
              </Button>
            </Box>
          ) : (
            <>
              <Box textAlign="center">
                <Text> 
                  <Link to='/signup'>New user?</Link>
                </Text>
                <Heading>Login</Heading>
              </Box>
              <Box my={4} textAlign="left">
                <form onSubmit={handleFormSubmit}>
                  {/* {error && <ErrorMessage message={error} />} */}
                  <FormControl isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      name="email"
                      id="email"
                      type="email"
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
                  <Button
                    variantColor="teal"
                    variant="outline"
                    type="submit"
                    width="full"
                    mt={4}
                  >
                    {isLoading ? (
                      <CircularProgress
                        isIndeterminate
                        size="24px"
                        color="teal"
                      />
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </Box>
            </>
          )}
        </Box>
      </Flex>
    );
  };
  
