import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OrderHistory from "./OrderHistory";
import SellHistory from "./SellHistory";
import ProductItem from "../components/ProductItem";
//import AddItem from "../components/AddItem";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries";
import { ADD_PRODUCT } from "../utils/mutations";
import { UPDATE_PRODUCTS } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

// import { Link as ReactLink } from "react-router-dom";
import { Box, Image, Flex, Text, Divider, useDisclosure, Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, Heading, Input, FormControl, FormLabel, Select, Button } from '@chakra-ui/react';

function SellerProfile() {

    const state = useSelector(state => state);
    const dispatch = useDispatch();


    const { loading, data } = useQuery(QUERY_USER);
    
    let user;

    if (data) {
         user = data.user;
    }

    useEffect(() => 
    {
        console.log(state);
        
        // if there's data to be stored
        if (data) 
        {
            // let's store it in the global state object
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.user.products
            });
        
            // but let's also take each product and save it to IndexedDB using the helper function 
            data.user.products.forEach((product) => 
            {
                idbPromise('products', 'put', product);
            });
            // add else if to check if `loading` is undefined in `useQuery()` Hook
        } 
        else if (!loading) 
        {
            // since we're offline, get all of the data from the `products` store
            idbPromise('products', 'get').then((products) => 
            {
                // use retrieved data to set global state for offline browsing
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: products
                });
            });
        }
    }, [data, loading, dispatch]);
    
    useEffect(() => 
    {
    }, [state.products.length]);


    return (
        <>
        {user ? (
        <Box margin={10}>   
            <Box>
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
                </Flex>
            </Box>
            <Divider orientation="horizontal" />

            <Heading width="100%" as="h2" textAlign="center" my="20px">Products Available:</Heading>

            <Box padding="10px" my="20px" mx="auto" textAlign="center">
                <AddProduct />
            </Box>

            <Box d="flex" height="100hv" alignItems="top" justifyContent="center" flexWrap="wrap" my="20px" >
                <Box fontSize="lg" align="center">
                    {state.products.length ? (
                        <Box d="flex" justifyContent="center" flexWrap="wrap">
                            {state.products.map(product => (
                                <Box m="2" key= {product._id}>
                                <ProductItem
                                    
                                    _id={product._id}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    quantity={product.quantity}
                                    description={product.description}
                                    category={product.category}
                                    userId={product.userId}
                                />
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Heading>You haven't added any products yet!</Heading>
                    )}
                </Box>
            </Box>
            
            <Box d="flex" height="100hv" width="100%" alignItems="top" justifyContent="space-around" flexWrap="wrap">

                <Box m="1" width="48%" minWidth="450px" textAlign="center" borderWidth={1} borderRadius={8} boxShadow="lg">
                    <Box borderWidth="1px" width="90%" minHeight="400px"  my="20px" mx="auto" textAlign="center">
                        <OrderHistory/>
                    </Box>
                </Box> 

                <Box m="1" width="48%" minWidth="450px" textAlign="center" borderWidth={1} borderRadius={8} boxShadow="lg">
                    <Box borderWidth="1px" width="90%" minHeight="400px"  my="20px" mx="auto" textAlign="center">
                        <SellHistory/>
                    </Box>
                </Box>
            </Box>
        </Box> 
        ) : null}
        </>
    )
    
}; 

function AddProduct() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const [formState, setFormState] = useState({ name: '', description: '', price: '', quantity: '', category: ''});
    const [addProduct] = useMutation(ADD_PRODUCT);
    
    const handleFormSubmit = async event => 
    {
        event.preventDefault();
        onClose();
        const mutationResponse = await addProduct({
            variables: {
                name: formState.name, 
                description: formState.description,
                price: parseFloat(formState.price), 
                quantity: parseInt(formState.quantity),
                category: formState.category
            }
        });

        dispatch({
            type: UPDATE_PRODUCTS,
            products: mutationResponse.data.addProduct.products
        });

        console.log(mutationResponse.data.addProduct.products);
    };
  
    const handleChange = event => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value
      });
    };

    const dispatch = useDispatch();

    const { loading, data } = useQuery(QUERY_USER);
    
    let user;

    if (data) {
         user = data.user;
    }
 
    return (
<>
            <Button ref={btnRef} bgColor="brand.500" size="lg" onClick={onOpen}>
                Add Product
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader mt="5">Add Products to Your Kiosk!</DrawerHeader>

                    <form onSubmit={handleFormSubmit}>
                        <DrawerBody>
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
                            <FormControl mt="5" isRequired>
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
                            <FormControl mt="5" isRequired>
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
                            <FormControl mt="5" isRequired>
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
                            <FormControl mt="5" isRequired>
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
                        </DrawerBody>
                        <DrawerFooter mt="8">
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                // variantColor="teal"
                                variant="outline"
                                type="submit"
                                width="full"
                                // mt={4}
                            >
                                Add Product to Kiosk
                            </Button>
                        </DrawerFooter>
                    </form>

                </DrawerContent>
            </Drawer>
        </>
    );
};



export default SellerProfile;
