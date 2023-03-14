import React, { useEffect, useState } from "react";
import { GetUserData, AddUserOrder } from "../actions/userActions";
import { deleteFromCart, SetTotal } from "../actions/cartActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function CheckoutPage({ token }) {
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.cart);

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    GetUserData(token)
      .then((response) => {
        setUser(response.data);
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, []);

  const handleOrder = async () => {
    if (Cart.cartItems.length > 0) {
      if (
        user.address.country &&
        user.address.city &&
        user.address.street &&
        user.address.nr &&
        user.address.zipcode
      ) {
        AddUserOrder(user._id, Cart.cartItems, Cart.total).then((response) => {
          if (response.data.Success) {
            alert("order success");
            Cart.cartItems.forEach((element) => {
              dispatch(deleteFromCart(element.data._id, element.color));
              dispatch(SetTotal(0));
            });
            Cart.total = 0;
          }
        });
      } else {
        alert("Set your shipment location!");
      }
    } else {
      alert("Empty cart!");
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <h1>unexpected error refresh the page!</h1>
      ) : (
        <>
          <h1>there will be future checkout site</h1>
          <button onClick={handleOrder}>{token}</button>
        </>
      )}
    </div>
  );
}
