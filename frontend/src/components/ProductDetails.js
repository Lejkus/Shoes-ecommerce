import React, { useEffect, useState } from "react";

export default function ProductDetails({ product }) {
  const [active_color, setColor] = useState(product.images[0].color);
  const [avenage, setAvenage] = useState(0)

  let acitve_images = [];

  acitve_images = product.images.find(
    ({ color }) => color === active_color.toUpperCase()
  );
   
  useEffect(() => {
    let avg = 0;
    product.reviews.map((review, index) => {
      avg += review.rating;
    });
    setAvenage(String(avg/product.reviews.length).slice(0,3) )
    console.log('render');
  }, []);

  return (
    <div className="single-product-page">
      <div className="image-section">
        {acitve_images.images.map((img, index) => {
          return <img src={img}></img>;
        })}
      </div>

      <div className="functional-section">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Users Rating: {avenage}/5</p>
        <hr></hr>
        {product.colors.map((color, index) => {
          return (
            <img
              onClick={() => {
                setColor(color);
              }}
              className="small-img"
              src={product.images[index].images[0]}
            ></img>
          );
        })}
      </div>
    </div>
  );
}
