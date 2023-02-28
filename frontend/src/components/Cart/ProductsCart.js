import React from "react";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "../../actions/cartActions";
import { ChangeQty } from "../../actions/cartActions";

export default function ProductsCart({ cartItems }) {
  const dispatch = useDispatch();
  
  const handleDelete = (item) => {
    dispatch(deleteFromCart(item.data._id, item.color));
  };

  const handleChange = (item, qty, e) => {
    dispatch(ChangeQty(item.data._id, item.color, qty));
    if (item.data.countInStock < qty) {
      e.currentTarget.value = item.data.countInStock;
    }
  };

  return (
    <div className="products-site">
      <h1>Shopping cart</h1>
      <hr></hr>
      <div className="titles">
        <h3>Product</h3>
        <h3 className="color">Color</h3>
        <h3>Quanity</h3>
        <h3>Subtotal</h3>
      </div>
      <hr></hr>
      <div className="products">
        {cartItems
          .map((item, index) => {
            return (
              <>
                <div className="product" key={index}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="70"
                    height="70"
                    viewBox="0 0 50 50"
                    onClick={() => {
                      handleDelete(item);
                    }}
                  >
                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                  </svg>
                  <img src={item.data.images[0].images[0]}></img>
                  <div className="info">
                    <p>{item.data.name}</p>
                    <p className="color">{item.color}</p>
                    <input
                      type="number"
                      min="1"
                      max={item.data.countInStock}
                      defaultValue={item.qty}
                      onBlur={(e) => {
                        handleChange(item, e.currentTarget.value, e);
                      }}
                    ></input>
                    {/* <p>{item.qty}</p> */}
                    <p>${item.qty * item.data.price}</p>
                  </div>
                </div>
                <hr></hr>
              </>
            );
          })
          .reverse()}
      </div>
    </div>
  );
}
