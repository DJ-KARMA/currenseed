import React, { useState } from 'react';
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

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = event => {
        event.preventDefault();
        alert(`Username: ${username} & Email: ${email} & Password: ${password}`);
    };



    return (

        <Flex width="full" align="center" justifyContent="center">
            <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                <Box textAlign="center">
                    <Heading>Signup</Heading>
                </Box>
                <Box my={4} textAlign="left">

                    <form onSubmit={handleSubmit}>

                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="username"
                                placeholder="*******"
                                size="lg"
                                onChange={event => setUsername(event.currentTarget.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="test@test.com"
                                size="lg"
                                onChange={event => setEmail(event.currentTarget.value)}
                            />
                        </FormControl>
                        <FormControl isRequired mt={6}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="*******"
                                size="lg"
                                onChange={event => setPassword(event.currentTarget.value)}
                            />
                        </FormControl>
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