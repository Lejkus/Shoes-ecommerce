import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Seach from "./search/Seach";
import CartAlert from "../components/Cart/CartAlert";

export default function Navbar() {
  const Cart = useSelector((state) => state.cart);
  const { cartItems } = Cart;

  const User = useSelector((state) => state.user);
  const { userInfo } = User;

  const [visibleSearch, setVisibleSearch] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2500);
  }, [Cart.succes, Cart.cartItems]);

  return (
    <header>
      <div className="navbar-container">
        <div className="shop-about">
          <Link
            to="/shop"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <p>SHOP</p>
          </Link>
          <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
            <p>ABOUT</p>
          </Link>
        </div>
        <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
          <h2 className="logo">Wolf Group</h2>
        </Link>

        <div className="icons">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {visibleSearch ? (
              <Seach
                changeVisible={() => {
                  setVisibleSearch(false);
                }}
              />
            ) : (
              <div
                style={{
                  maxWidth: "150px",
                  width: "150px",
                  marginRight: "50px",
                }}
              ></div>
            )}

            <svg
              onClick={() => setVisibleSearch(!visibleSearch)}
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35"
              height="35"
              viewBox="0 0 50 50"
            >
              <path
                d="M23.3,25.9l-6.09-8.15C18.94,15.86,20,13.31,20,10.5C20,4.71,15.51,0,10,0S0,4.71,0,10.5S4.49,21,10,21
	c2.13,0,4.1-0.71,5.72-1.9l5.97,8L23.3,25.9z M2,10.5C2,5.81,5.59,2,10,2s8,3.81,8,8.5S14.41,19,10,19S2,15.19,2,10.5z"
              ></path>
            </svg>
          </div>
          <Link to={userInfo.token !== undefined ? `/profile` : `/login`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35"
              height="35"
              viewBox="5 0  75 74"
            >
              <path d="M 24.5 4 C 19.722667 4 15.801817 5.343806 13.09375 7.9082031 C 10.385683 10.4726 9 14.183812 9 18.5 L 9 22.257812 C 7.8597735 23.168256 7 24.430675 7 26 C 7 28.361739 8.7044726 30.27003 10.919922 30.78125 C 11.816449 34.336333 13.30684 37.503248 15.40625 39.828125 C 17.708437 42.377556 20.706886 44 24 44 C 27.293114 44 30.291563 42.377556 32.59375 39.828125 C 34.69316 37.503248 36.183551 34.336333 37.080078 30.78125 C 39.295527 30.27003 41 28.361739 41 26 C 41 24.430284 40.137097 23.174656 39 22.269531 L 39 20.5 C 39 18.972289 38.692905 17.684593 38.388672 16.746094 C 39.729084 15.976372 40.404471 14.301112 39.703125 12.832031 C 37.198859 7.5967448 31.772704 4 24.5 4 z M 24.5 7 C 30.817296 7 34.972359 9.8962399 36.996094 14.126953 C 37.015684 14.168703 37.01229 14.182458 36.9375 14.205078 C 35.831221 14.539662 33.155739 15 30 15 C 26.1875 15 23.651629 14.289593 22.091797 13.621094 C 20.531965 12.952594 20.060547 12.439453 20.060547 12.439453 A 1.50015 1.50015 0 0 0 17.591797 12.982422 C 17.591797 12.982422 17.257509 14.021898 15.583984 15.310547 A 1.501294 1.501294 0 1 0 17.416016 17.689453 C 18.397661 16.933566 18.998913 16.16239 19.472656 15.5 C 19.971545 15.84549 19.970136 15.976878 20.908203 16.378906 C 22.848371 17.210407 25.8125 18 30 18 C 32.191533 18 33.963016 17.797096 35.484375 17.541016 C 35.729342 18.236361 36 19.210403 36 20.5 L 36 22.878906 A 1.50015 1.50015 0 0 0 36.855469 24.234375 C 37.54264 24.561015 38 25.202806 38 26 C 38 27.122343 37.122343 28 36 28 C 36.264714 28 36.24617 27.994141 35.939453 27.994141 A 1.50015 1.50015 0 0 0 34.470703 29.185547 C 33.727184 32.728666 32.236501 35.746337 30.367188 37.816406 C 28.497877 39.886516 26.317886 41 24 41 C 21.682114 41 19.502126 39.886475 17.632812 37.816406 C 15.763499 35.746337 14.272816 32.728666 13.529297 29.185547 A 1.50015 1.50015 0 0 0 12.060547 27.994141 C 11.753833 27.994141 11.735286 28 12 28 C 10.877657 28 10 27.122343 10 26 C 10 25.196375 10.461497 24.541671 11.142578 24.21875 A 1.50015 1.50015 0 0 0 12 22.863281 L 12 18.5 C 12 14.808188 13.114317 12.01954 15.15625 10.085938 C 17.198183 8.1523341 20.277333 7 24.5 7 z M 19 24 A 2 2 0 0 0 19 28 A 2 2 0 0 0 19 24 z M 29 24 A 2 2 0 0 0 29 28 A 2 2 0 0 0 29 24 z"></path>
            </svg>
          </Link>
          <Link to={`/cart`}>
            {Cart.succes ? <CartAlert visible={visible} /> : <></>}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35"
              height="35"
              viewBox="0 0 50 50"
            >
              <path d="M 17.90035,7.643509 V 5.619649 C 17.90035,2.5150875 15.385265,0 12.2807,0 V 0 C 9.185965,0 6.6610525,2.5249125 6.6610525,5.619649 v 2.02386 H 0 V 28 H 24.954385 V 7.643509 Z M 8.625965,5.619649 c 0,-2.014035 1.6407,-3.6547365 3.654735,-3.6547365 v 0 c 0.972635,0 1.89614,0.3831575 2.58386,1.070877 0.68772,0.6877195 1.07088,1.611228 1.07088,2.5838595 v 2.02386 H 8.625965 Z M 22.989475,26.03509 H 1.9649125 V 9.608421 H 22.989475 Z"></path>
            </svg>

            {cartItems.length === 0 ? (
              <></>
            ) : (
              <div className="count">{cartItems.length}</div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
