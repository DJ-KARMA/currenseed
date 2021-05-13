import React from "react";
import { useMutation } from '@apollo/react-hooks';
//import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";

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
  const [formState, setFormState] = useState({ email: '', password: '', seeds: '' })
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
      const token = mutationResponse.data.login.token;
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

  const addSeeds = event => {
    const { seeds } = event.target;
    setFormState({
      ...formState, 
      [seeds]: Math.floor(Math.random()*20) + 1
    });
  };

  return (

        <Flex width="full" align="center" justifyContent="center">
          <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
            <Box textAlign="center">
              <Heading>Login</Heading>
              </Box>
              <Box my={4} textAlign="left">
               
          <form onSubmit={handleFormSubmit}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="test@test.com" onChange={handleChange} />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="*******" onChange={handleChange} />
            </FormControl>
            <Button width="full" mt={4} type="submit" onClick={addSeeds}>
              Sign In
            </Button>
          </form>
            </Box>
          </Box>
        </Flex>
      );
  }

export default Login;