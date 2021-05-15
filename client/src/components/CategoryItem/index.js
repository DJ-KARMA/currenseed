import React from "react";
import { Link } from "react-router-dom";


function CategoryItem(item) {
  const {
    name,
    description,
    image,
    price,
    quantity,
    category,
    _id,
  } = item;
  //needs to be converted to Chakra
  return (
    <div className="tbd">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          //src={`/images/${image}`}
        />
        <p>{name}</p>
        <p>{description}</p>
      </Link>
      <div>
        <div>{quantity} in stock</div>
        <span>${price}</span>
      </div>
    </div>
  );
}

export default CategoryItem;
