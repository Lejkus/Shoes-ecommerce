import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product/Product";
import Loading from "../components/Product/Loading";

export default function ProductsPage() {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="products">
          <h1>error</h1>
        </div>
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
