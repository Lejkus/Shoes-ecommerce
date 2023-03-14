import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleProduct } from "../actions/productActions";
import ProductDetails from "../components/Product/ProductDetails";
import Reviews from "../components/Review/Reviews";

export default function SingleProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const Product = useSelector((state) => state.singleProduct);
  const { loading, error, product } = Product;

  useEffect(() => {
    dispatch(singleProduct(id));
    window.scrollTo(0, 0)
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : product ? (
        <>
          <ProductDetails product={product} />
          <Reviews reviews={product.reviews} />
        </>
      ) : (
        <h1>error</h1>
      )}
    </>
  );
}
