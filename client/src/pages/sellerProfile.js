import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OrderHistory from "./OrderHistory";
import SellHistory from "./SellHistory";
import ProductItem from "../components/ProductItem";
//import AddItem from "../components/AddItem";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_CATEGORIES } from "../utils/queries";
import { ADD_PRODUCT, ADD_SEEDS } from "../utils/mutations";
import { UPDATE_PRODUCTS, UPDATE_SEEDS, UPDATE_CATEGORIES } from "../utils/actions"
import { idbPromise } from "../utils/helpers";

// import { Link as ReactLink } from "react-router-dom";
import { Box, Image, Flex, Text, Divider, useDisclosure, Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useToast,
    DrawerCloseButton, Heading, Input, FormControl, FormLabel, Select, Button } from '@chakra-ui/react';

function SellerProfile() {

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const [loading2, setLoading] = useState(true);

    const { loading, data } = useQuery(QUERY_USER);
    
    const { loading3, data2 } = useQuery(QUERY_CATEGORIES);

    let user;

    if (data) {
         user = data.user;
    }

    // let categories;

    // if (data2) {
    //     categories = data2.categories;
    // }

    const [addSeeds] = useMutation(ADD_SEEDS);

    const handleSeedAdd = async event => {
        event.preventDefault(); 
        const mutationResponse = await addSeeds({ variables: { _id: user._id, seeds: user.seeds } }); 
        setLoading(true);
        console.log(mutationResponse.data.addSeeds);
        dispatch({
            type: UPDATE_SEEDS,
            seeds: mutationResponse.data.addSeeds.seeds
        });

        console.log(mutationResponse.data.addSeeds);
    };
    console.log("state",state);
    console.log("user",user);
    // console.log("data2",data2);


    useEffect(() => 
    {
        // console.log(data2,loading3)
        // console.log(state);
        // if(data2)
        // {
        //     dispatch({
        //         type: UPDATE_CATEGORIES,
        //         categories: categories
        //     });
        //     console.log("data2",data2);
        //     data2.categories.forEach((category) => 
        //     {
        //         idbPromise('categories', 'put', category);
        //     });

        // }
        // else if (!loading3) 
        // {
        //     idbPromise('categories', 'get').then((categories) => 
        //     {
        //         // use retrieved data to set global state for offline browsing
        //         dispatch({
        //             type: UPDATE_CATEGORIES,
        //             categories: categories
        //         });
        //     });
        // }
        
        // if there's data to be stored
        if (data) 
        {
            dispatch({
                type: UPDATE_SEEDS,
                seeds: user.seeds
            });
            // let's store it in the global state object
            dispatch({
                type: UPDATE_PRODUCTS,
                products: user.products
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
    }, [state.products.length,state.seeds,data,state.categories.length, loading, dispatch]);
    

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
                        Seeds: {state.seeds} 
                    </Text>
                    <Button
                        color={["white"]} 
                        size="lg"
                        bg={["brand.800"]}
                         _hover={{
                        color: ["brand.500"]
                        }}
                            type="submit"
                            width=""
                            mt={4}
                            id="seedbtn"
                            onClick={handleSeedAdd}
                            disabled={loading2}
                        >
                            Click me!
                        </Button>
                </Flex>
            </Box>
            <Divider orientation="horizontal" />

            <Heading width="100%" as="h2" textAlign="center" my="20px">Products Available:</Heading>

            <Box padding="10px" my="20px" mx="auto" textAlign="center">
                <AddProduct setLoading={setLoading}/>
            </Box>

            <Box d="flex" height="100hv" alignItems="top" justifyContent="center" flexWrap="wrap" my="20px" >
                <Box fontSize="lg" align="center">
                    {state.products.length ? (
                        <Box d="flex" justifyContent="center" flexWrap="wrap">
                            {state.products.map(product => (
                                <Box key= {product._id} m="2">
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
        </Box> 
        ) : null}
        </>
    )
    
}; 

function AddProduct({setLoading}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const state = useSelector(state => state);

    const [formState, setFormState] = useState({ name: '', description: '', price: '', quantity: '', category: ''});
    const [addProduct] = useMutation(ADD_PRODUCT);
    const toast = useToast();

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

        if(mutationResponse)
        {
            toast({
                title: "Product added.",
                description: "Your Product has been added to you kosik.",
                status: "success",
                // duration: 9000,
                isClosable: true,
            })
        }
        else
        {
            toast({
                title: "Product failed.",
                description: "Your Product has failed to be added to you kosik.",
                status: "error",
                // duration: 9000,
                isClosable: true,
            })
        }

        setLoading(false);
        console.log("mutationResponse.data.addProduct.products",mutationResponse.data.addProduct.products);

        dispatch({
            type: UPDATE_PRODUCTS,
            products: data.user.products
        });
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

    // const [addSeeds] = useMutation(ADD_SEEDS);

    // const handleSeedAdd = async event => {
    //     event.preventDefault(); 
    //     const mutationResponse = await addSeeds({ variables: { _id: user._id, seeds: user.seeds } }); 
      
    //     dispatch({
    //         type: UPDATE_SEEDS,
    //         products: mutationResponse.data.addSeeds
    //     });

    //     console.log(mutationResponse.data.addSeeds);
    // };
 
    return (
<>
            <Button ref={btnRef} 
                    color={["white"]} 
                    size="lg"
                    bg={["brand.800"]}
                    _hover={{
                    color: ["brand.500"]
                    }}
            onClick={onOpen}>
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
                                    placeholder=""
                                    size="lg"
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl mt="5" isRequired>
                                <FormLabel htmlFor="category">Product Category</FormLabel>
                                    <Select placeholder="Category" name="category" onChange={handleChange}>
                                        <option value="Craft Beer">Craft Beer</option>
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
                            <Button 
                                color={["white"]} 
                                size="lg"
                                bg={["brand.800"]}
                                _hover={{
                                 color: ["brand.500"]
                                 }}
                            
                            mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                color={["white"]} 
                                size="lg"
                                bg={["brand.800"]}
                                    _hover={{
                                    color: ["brand.500"]
                                    }}
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
