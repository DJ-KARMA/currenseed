//dependencies
import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
//utilities
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from '../../utils/helpers';
//chakra ui
import { Box, Flex, Button,Stack, Container, Heading, Link } from "@chakra-ui/react";



const CategoryMenu = () => {
	const state = useSelector((state) => {
		return state
	  });
	  
	  const dispatch = useDispatch();
	
	  const { categories } = state;
	
	  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

	  useEffect(() => {
		if (categoryData) {
		  dispatch({
			type: UPDATE_CATEGORIES,
			categories: categoryData.categories
		  });
		  categoryData.categories.forEach(category => {
			idbPromise('categories', 'put', category);
		  });
		} else if (!loading) {
		  idbPromise('categories', 'get').then(categories => {
			dispatch({
			  type: UPDATE_CATEGORIES,
			  categories: categories
			});
		  });
		}
	  }, [categoryData, loading, dispatch]);
	
	  const handleClick = id => {
		dispatch({
		  type: UPDATE_CURRENT_CATEGORY,
		  currentCategory: id
		});
	  };

	return (
			
		<Flex m="5" justifyContent="center">
			<Stack m="2" alignContent="center" >
				<Box fontSize="lg" align="center">
					<Container>
						Currenseed is your local farmer’s market online.
					</Container>
					<Container>
						As a buyer you can shop from all the your local vendors in one convenient place from the comfort of your home.
					</Container>
					<Container>
						Vendors can post their products online to be sold without having to travel to the market and setup.
					</Container>
					<Container>
						The more you buy/sell the more "Seeds" you will accumulate. Seeds can be used to purchase items.
					</Container>
				</Box>
				<Box>
					<Container fontSize="3xl" align="center" fontWeight="bold" color="brand.500">Niagara Region</Container>
				</Box>
				<Box>
					<Box>
						<Heading> Click on a category to explor local sellers </Heading>
						{categories.map(item => (
							<Link to={`/categories/${item.id}`}>
							<Button
								key={item._id}
								onClick={() => {
									handleClick(item._id);
								}}
							>
								{item.name}
							</Button>
						</Link>
						))}
					</Box>
				</Box>
			</Stack>
		</Flex>
		);
}

export default CategoryMenu; 
