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
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default CategoryItem;
