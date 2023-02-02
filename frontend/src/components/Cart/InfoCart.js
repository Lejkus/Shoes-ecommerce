import React, { useEffect, useState } from "react";

export default function InfoCart({ cartItems }) {
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [shippType, setShippType] = useState(10);

  const HandleShipChange = (event) => {
    setShippType(event.target.value);
  };
  useEffect(() => {
    let total1 = 0;
    let shipp = 0;
    cartItems.map((item) => {
      total1 += item.data.price * item.qty;
      shipp += shippType * item.qty;
    });
    setTotal(total1);
    setShipping(shipp);
  }, [{ cartItems }]);

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
          <button>Proceed to checkout</button>
        </center>

        <hr></hr>
      </div>
    </div>
  );
}
