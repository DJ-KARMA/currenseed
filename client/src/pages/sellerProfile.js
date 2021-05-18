import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OrderHistory from "./OrderHistory";
import SellHistory from "./SellHistory";
import ProductList from "../components/ProductList";
//import AddItem from "../components/AddItem";

import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries";
import { ADD_PRODUCT, ADD_SEEDS } from "../utils/mutations";
// import { UPDATE_PRODUCTS } from "../utils/actions"

// import { Link as ReactLink } from "react-router-dom";
import { Box, Image, Flex, Text, Divider, Stack, Center, SimpleGrid, Link, Heading, Input, FormControl, FormLabel, Select, Button } from '@chakra-ui/react';

function SellerProfile(props) {
    const { loading, data } = useQuery(QUERY_USER);
    let user;

    if (data) {
         user = data.user;
    }

    // const text = "Click me!";
    // const [buttonText, setButtonText] = useState(text);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setButtonText(text);
    //     }, 1000);
    //     return ()=> clearTimeout(timer);
    // }, [buttonText])

    const [addSeeds] = useMutation(ADD_SEEDS);

    const handleSeedAdd = async event => {
        event.preventDefault(); 
        const mutationResponse = await addSeeds({ variables: { _id: user._id, seeds: user.seeds } }); 
        const seedCount = mutationResponse.data.addSeeds; 
    };

    return (
        <>
        {user ? (
        <Box>   
            <Box margin={10}>
                <Flex height="100hv" alignItems="top" justifyContent="space-between">  
                    <Box>   
                        <Text m={2} fontSize="xx-large" fontWeight="semibold" lineHeight="short">
                            {user.firstName}'s Kiosk
                        </Text>
                        <Text m={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                            Location: {user.location}
                        </Text>
                    </Box>
                    <Text m={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                        Seeds: {user.seeds} 
                    </Text>
                    <Button
                            variantColor="teal"
                            variant="outline"
                            type="submit"
                            width=""
                            mt={4}
                            id="seedbtn"
                            onClick={handleSeedAdd}
                        >
                            Click me!
                        </Button>
                </Flex>
            </Box>
            <Divider orientation="horizontal" />

            <Box d="flex" height="100hv" alignItems="top" justifyContent="space-around" flexWrap="wrap">
                <Heading as="h2">Products Available:</Heading>
            </Box>
            
            <Box d="flex" height="100hv" alignItems="top" justifyContent="space-around" flexWrap="wrap">
                <Box minWidth="450px" textAlign="center">
                    <Box borderWidth="1px" width="90%" minHeight="300px" padding="10px" my="20px" mx="auto" textAlign="center">
                        <OrderHistory></OrderHistory>
                    </Box>
                </Box> 

                <Box minWidth="450px" textAlign="center">
                    <Box borderWidth="1px" width="90%" minHeight="400px" padding="10px" my="20px" mx="auto" textAlign="center">
                        <SellHistory></SellHistory>
                    </Box>
                </Box>
                <Box minWidth="450px" textAlign="center">
                    <Box borderWidth="1px" width="90%" minHeight="400px" padding="10px" my="20px" mx="auto" textAlign="center">
                        <AddProduct />
                    </Box>
                </Box> 

            </Box>
        </Box> 
        ) : null}
        </>
    )
    
}; 

function AddProduct(props) {
    const [formState, setFormState] = useState({ name: '', description: '', price: '', quantity: '', category: ''});
    const [addProduct] = useMutation(ADD_PRODUCT);
    
    const handleFormSubmit = async event => {
      event.preventDefault();
            const mutationResponse = await addProduct({
                variables: {
                    name: formState.name, description: formState.description,
                    price: parseFloat(formState.price) , quantity: parseInt(formState.quantity) ,
                    category: formState.category.value
                }
            });
        console.log(mutationResponse.data.addProduct);
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
                    <Heading>Add Products to Your Kiosk!</Heading>
                </Box>
                <Box my={4} textAlign="left">

                    <form onSubmit={handleFormSubmit}>

                        <FormControl isRequired>
                            <FormLabel htmlFor="name">Product name:</FormLabel>
                            <Input
                                type="name"
                                name="name"
                                id="firstName"
                                placeholder="Apples"
                                size="lg"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="description">Product Description:</FormLabel>
                            <Input
                                type="description"
                                name="description"
                                id="description"
                                placeholder="Granny Smith"
                                size="lg"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="price">Product Price:</FormLabel>
                            <Input
                                type="price"
                                name="price"
                                id="price"
                                placeholder="$.75"
                                size="lg"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="quantity">Product Quantity</FormLabel>
                            <Input
                                type="quantity"
                                name="quantity"
                                id="quantity"
                                placeholder="5"
                                size="lg"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="category">Product Category</FormLabel>
                                <Select placeholder="Category">
                                    <option value="Craft Beers">Craft Beers</option>
                                    <option value="Fresh Produce">Fresh Produce</option>
                                    <option value="Jewelry">Jewelry</option>
                                    <option value="Artisan Cheese">Artisan Cheese</option>
                                    <option value="Fresh Meat">Fresh Meat</option>
                                    <option value="Handmade Items">Handmade Items</option>
                                    <option value="Baked Goods">Baked Goods</option>
                                    <option value="Wine">Wine</option>
                                </Select>
                        </FormControl>
                        <Button
                            variantColor="teal"
                            variant="outline"
                            type="submit"
                            width="full"
                            mt={4}
                        >
                            Add Product to Kiosk
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
};



export default SellerProfile;
