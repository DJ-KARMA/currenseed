import React from "react";
import { useParams } from 'react-router-dom';
// import { Box, Heading, Flex, Image, Text} from "@chakra-ui/react";
import ProductList from '../components/ProductList';
// import { QUERY_PRODUCTS} from "../utils/queries";

// /categories/:categoryId

function CategoryDetail ({ }) {
   const { categoryId } = useParams();

    return <ProductList categoryId={categoryId} />
}

export default CategoryDetail