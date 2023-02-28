import React, { useEffect, useState } from "react";
import { GetUserData } from "../actions/userActions";

export default function ProfilePage({ token }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div>
      <h1>profile</h1>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <>{error}</>
      ) : (
        <>
          <h3>{user.name}</h3>
          <h3>{user.surname}</h3>

          {user.orders.map((order, index) => {
            console.log(order);
            return (
              <div style={{border:"2px solid black"}} key={index}>
                <h1>Order status: {order.status}</h1>
                <h3>Ordered: {order.createdAt.slice(0, 10)}</h3>
                <h3>Total: ${order.total}</h3>
                {order.products.map((product, index) => {
                  return (
                    <div key={index}>
                      <h3>{product.data.name}</h3>
                      <img style={{width:"200px",height:"150px"}} src={product.data.images[0].images[0]}></img>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
