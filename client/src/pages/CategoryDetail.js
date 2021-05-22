//dependencies
import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
//utilities
import { QUERY_CATEGORIES } from "../utils/queries";
//components
import ProductList from '../components/ProductList';
import { Box, Container } from "@chakra-ui/react";

function CategoryDetail ({ }) {
   const { categoryId } = useParams();
   const { data } = useQuery(QUERY_CATEGORIES);
    let categories = [];
        if (data) {
        categories = data.categories;
        }

    const currentCategory = categories.find(category => categoryId === category._id);
    return (
    <Box>
    <Box>
		<Container fontSize="3xl" align="center" fontWeight="bold" color="brand.500">{currentCategory?.name}</Container>
	</Box>
    <ProductList categoryId={categoryId} />
    </Box>)
}
export default CategoryDetail;