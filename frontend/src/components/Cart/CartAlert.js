import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CartAlert({ visible }) {
  const Cart = useSelector((state) => state.cart);
  const { succes, cartItems } = Cart;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total1 = 0;
    cartItems.map((item) => {
      total1 += item.data.price * item.qty;
    });
    setTotal(total1);
  }, [cartItems]);

  return (
    <div className="cart-allert">
      <Link to={`/cart`}>
        <div className={visible ? "triangle" : "triangle-hidden"}></div>
        <div className={visible ? "added-alert" : "added-alert-hidden"}>
          <center color="red">
            <b>{succes}</b>
          </center>
          <div className="items">
            {cartItems
              .map((item, index) => {
                return (
                  <div className="item-cart" key={index}>
                    <img src={item.data.images[0].images[0]}></img>
                    <a>qty: {item.qty}</a>
                    <a>${item.data.price}</a>
                  </div>
                );
              })
              .reverse()}
          </div>
          <a className="total">total: ${total}</a>
        </div>
      </Link>
    </div>
  );
}
