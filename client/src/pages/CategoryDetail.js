//dependencies
import React from "react";
import { useParams } from 'react-router-dom';
//components
import ProductList from '../components/ProductList';

function CategoryDetail ({ }) {
   const { categoryId } = useParams();

    return <ProductList categoryId={categoryId} />
}

export default CategoryDetail;