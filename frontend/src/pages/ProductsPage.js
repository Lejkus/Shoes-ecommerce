import React from "react";
import Products from "../components/Product/Products";
import Filters from "../components/Product/Filters";
import { useSelector } from "react-redux";

export default function ProductsPage() {
  const productList = useSelector((state) => state.productList);

  return (
    <div className="product-page">
      <Filters  products={productList.products}/>
      <Products {...productList}/>
    </div>
  );
}
