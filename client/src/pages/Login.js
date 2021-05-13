import React from "react";
// import { useMutation } from '@apollo/react-hooks';
// // import { Link } from "react-router-dom";
// import { LOGIN } from "../utils/mutations"
// import Auth from "../utils/auth";

import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react';

function Login(props) {

  return (

        <Flex width="full" align="center" justifyContent="center">
          <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
            <Box textAlign="center">
              <Heading>Login</Heading>
              </Box>
              <Box my={4} textAlign="left">
               
          <form>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="test@test.com" />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="*******" />
            </FormControl>
            <Button width="full" mt={4} type="submit">
              Sign In
            </Button>
          </form>
            </Box>
          </Box>
        </Flex>
      );
  }

export default Login;