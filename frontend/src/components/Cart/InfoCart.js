import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SetTotal } from "../../actions/cartActions";
import Button from "../Button";

export default function InfoCart({ cartItems }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const User = useSelector((state) => state.user);
  const token = User.userInfo.token;

  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [shippType, setShippType] = useState(10);

  const HandleShipChange = (event) => {
    setShippType(event.target.value);
  };

  const handleCheckout = () => {
    if (token) {
      navigate(`/checkout`);
    } else {
      alert("Login to checkout");
    }
  };

  useEffect(() => {
    let totalitems = 0;
    let totalship = 0;
    cartItems.map((item) => {
      totalitems += item.data.price * item.qty;
      totalship += shippType * item.qty;
    });
    setTotal(totalitems);
    setShipping(totalship);
  }, [{ cartItems }]);

  useEffect(() => {
    dispatch(SetTotal(total + shipping));
  }, [total + shipping]);

  return (
    <div className="info-site">
      <h1>Cart totals</h1>
      <div className="info">
        <hr></hr>
        <div>
          <h3>Subtotal</h3>
          <h3>${total}</h3>
        </div>
        <hr></hr>
        <div className="shiping">
          <h3>Shiping</h3>
          <div onChange={HandleShipChange} className="radio">
            <div>
              <p>Free (14-21 days)</p>
              <input type="radio" value="0" name="shiptype" />
            </div>
            <div>
              <p>Fast (7-14 days)</p>
              <input type="radio" defaultChecked value="10" name="shiptype" />
            </div>
            <div>
              <p>Express (3-7 days)</p>

              <input type="radio" value="15" name="shiptype" />
            </div>
          </div>
          <h3 className="total-ship">${shipping}</h3>
        </div>
        <hr></hr>
        <div>
          <h3>Total</h3>
          <h3>${total + shipping}</h3>
        </div>
        <hr></hr>
        <center>
          {total + shipping < 1 ? (
            <a  onClick={handleCheckout}>
              <Button
                width={"400px"}
                height={"50px"}
                margintop={"10px"}
                text={"Proceed to checkout"}
              />
            </a>
          ) : (
            <a  onClick={handleCheckout}>
              <Button
                width={"400px"}
                height={"50px"}
                margintop={"10px"}
                text={"Proceed to checkout"}
              />
            </a>
          )}
        </center>
        <hr></hr>
      </div>
    </div>
  );
}
