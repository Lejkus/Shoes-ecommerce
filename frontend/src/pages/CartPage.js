import React from "react";
import ProductsCart from "../components/Cart/ProductsCart";
import { useSelector } from "react-redux";
import InfoCart from "../components/Cart/InfoCart";

export default function CartPage() {
  const Cart = useSelector((state) => state.cart);
  const { adding, error, cartItems } = Cart;

  return (
    <div className="cart-page">
      <ProductsCart cartItems={cartItems} />
      <InfoCart cartItems={cartItems}/>
    </div>
  );
}
