
import React, { useEffect } from "react";
import { useMutation } from '@apollo/react-hooks';
import { ADD_ORDER, ADD_SEEDS } from "../utils/mutations";
import { idbPromise } from '../utils/helpers';

function Success() {
    const [addOrder] = useMutation(ADD_ORDER, ADD_SEEDS);

    useEffect(() => {
        async function saveOrder() {
            const cart = await idbPromise('cart', 'get');
            const products = cart.map(item => item._id);
            const seeds = cart.map(item => item.price)
            if (products.length) {
                const { data } = await addOrder({ variables: { products, seeds } });
                const productData = data.addOrder.products;
                const seedData = data.addOrder.seeds; 
              
                productData.forEach((item) => {
                  idbPromise('cart', 'delete', item);
                });
            }
        }
        saveOrder();
    }, [addOrder]);
    //convert to Chakra 
    return (
      <div>
          <h1>Success!</h1>
          <h2>
            Thank you for your purchase!
          </h2>
          <h2>
            You will now be redirected to the homepage
          </h2>
      </div>
    );
  };

export default Success; 