import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import Button from "../Button";

export default function ProductDetails({ product }) {
  const dispatch = useDispatch();

  const [active_color, setColor] = useState(product.images[0].color);
  const [avenage, setAvenage] = useState(0);
  const [acitve_images, setImages] = useState(product.images[0]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, active_color));
  };

  //setAvenage
  useEffect(() => {
    let avg = 0;
    product.reviews.map((review, index) => {
      avg += review.rating;
    });
    setAvenage(String(avg / product.reviews.length).slice(0, 3));
  }, []);

  //setImages
  useEffect(() => {
    window.scrollTo(0, 0);
    setImages(
      product.images.find(({ color }) => color === active_color.toUpperCase())
    );
  }, [active_color]);

  return (
    <div className="single-product-page">
      <div className="image-section">
        {acitve_images.images.map((img, index) => {
          return <img key={index} src={img}></img>;
        })}
      </div>

      <div className="functional-section">
        <h1>{product.name}</h1>
        <p className="desc">{product.description}</p>
        <hr></hr>
        <p>Users Rating: {avenage}/5</p>
        <hr></hr>
        <p>
          <b>COLOR </b>
          {active_color} | WHITE
        </p>
        {product.colors.map((color, index) => {
          return (
            <img
              onClick={() => {
                setColor(color);
              }}
              className="small-img"
              src={product.images[index].images[0]}
              key={index}
            ></img>
          );
        })}
        <hr></hr>
        <h3>Last comment: </h3>
        {product.reviews.length > 0 ? (
          <p>
            {product.reviews[product.reviews.length - 1].name}:&nbsp;
            {product.reviews[product.reviews.length - 1].comment}
            &nbsp;&nbsp;&nbsp;
            <b>{product.reviews[product.reviews.length - 1].rating}/5 </b>
          </p>
        ) : (
          <>No reviews yet</>
        )}

        <hr></hr>
        <center>
          <a
            onClick={() => {
              addToCartHandler();
            }}
          >
            <Button width={"400px"} height={"40px"} text={"ADD TO CART"} />
          </a>

          <p className="status">
            Status:{" "}
            {parseInt(product.countInStock) > 15 ? (
              <>Avaible</>
            ) : (
              <>Last {product.countInStock} pieces!</>
            )}
          </p>
        </center>
      </div>
    </div>
  );
}
