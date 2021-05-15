import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_BUYER, QUERY_SELLER } from "../utils/queries";

function OrderHistory() {
    const { data } = useQuery(QUERY_BUYER, QUERY_SELLER);
    let buyer;
    let seller
  
    if (data) {
      buyer = data.buyer;
    }
    //return statement below:
    //return ()
  
  };
  
  export default OrderHistory;