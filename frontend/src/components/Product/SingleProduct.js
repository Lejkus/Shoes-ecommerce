import React, { useState } from "react";

import { Link } from "react-router-dom";

export default function Product({ product }) {
  const [img, setImg] = useState(product.images[0].images[0]);

  return (
    <div
      className="product"
      onMouseEnter={(e) => setImg(product.images[0].images[1])}
      onMouseLeave={(e) => setImg(product.images[0].images[0])}
    >
      <Link to={`/product/${product._id}`}>
        <img loading="lazy" src={img}></img>
      </Link>

      <div className="images">
        {product.colors.map((c, index) => {
          return (
            <img
              key={index}
              src={product.images[index].images[0]}
              className={`small-img`}
              onClick={(e) => setImg(product.images[index].images[1])}
            ></img>
          );
        })}
      </div>
      <div className="product-desc">
        <p>{product.colors.length} colors avaible</p>
        <h4>{product.name}</h4>
        <h3>${product.price}</h3>
      </div>
    </div>
  );
}
