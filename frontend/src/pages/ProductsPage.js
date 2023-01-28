import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";


export default function ProductsPage() {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  return (
    <>
      {loading ? (
        <div className="products-loading">
          <div className="product-loading">
            <div className="image-loading"></div>
            <div className="p-loading"></div>
            <div className="h-loading"></div>
            <div className="h-loading"></div>
          </div>
          <div className="product-loading">
            <div className="image-loading"></div>
            <div className="p-loading"></div>
            <div className="h-loading"></div>
            <div className="h-loading"></div>
          </div>
          <div className="product-loading">
            <div className="image-loading"></div>
            <div className="p-loading"></div>
            <div className="h-loading"></div>
            <div className="h-loading"></div>
          </div>
          <div className="product-loading">
            <div className="image-loading"></div>
            <div className="p-loading"></div>
            <div className="h-loading"></div>
            <div className="h-loading"></div>
          </div>
          <div className="product-loading">
            <div className="image-loading"></div>
            <div className="p-loading"></div>
            <div className="h-loading"></div>
            <div className="h-loading"></div>
          </div>
          <div className="product-loading">
            <div className="image-loading"></div>
            <div className="p-loading"></div>
            <div className="h-loading"></div>
            <div className="h-loading"></div>
          </div>
          <div className="product-loading">
            <div className="image-loading"></div>
            <div className="p-loading"></div>
            <div className="h-loading"></div>
            <div className="h-loading"></div>
          </div>
          <div className="product-loading">
            <div className="image-loading"></div>
            <div className="p-loading"></div>
            <div className="h-loading"></div>
            <div className="h-loading"></div>
          </div>
          <div className="product-loading">
            <div className="image-loading"></div>
            <div className="p-loading"></div>
            <div className="h-loading"></div>
            <div className="h-loading"></div>
          </div>
        </div>
      ) : error ? (
        <h1>error</h1>
      ) : (
        <div className="products">
          {products.length == 0 ? (
            <h1>No products find :(</h1>
          ) : (
            products.map((p, i) => {
              return <Product key={p._id} product={p} />;
            })
          )}
        </div>
      )}
    </>
  );
}
