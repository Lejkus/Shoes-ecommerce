import React, { useEffect, useState } from "react";
import { GetUserData } from "../actions/userActions";
import { Link } from "react-router-dom";
import { ChangeUserAddress } from "../actions/userActions";
import Button from "../components/Button";

export default function ProfilePage({ token }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState();
  const [render, setRender] = useState(false);

  const handleChangeAddress = () => {
    ChangeUserAddress(user._id, address);
    setVisible(false);
    setRender(!render);
  };

  useEffect(() => {
    GetUserData(token)
      .then((response) => {
        setUser(response.data);
        setAddress(response.data.address);
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [render]);

  return (
    <div className="profile-page">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <>{error}</>
      ) : (
        <>
          <div className="user-info">
            <div className="person-info">
              <img
                style={{ width: "200px" }}
                src="https://st4.depositphotos.com/1012074/20946/v/450/depositphotos_209469984-stock-illustration-flat-isolated-vector-illustration-icon.jpg"
              ></img>
              <div style={{ padding: "20px" }}>
                <h3>name: {user.name}</h3>
                <h3>surname: {user.surname}</h3>
                <h3>email: {user.email}</h3>
              </div>
            </div>
            <div className="address-info">
              <h3>Address:</h3>
              {visible ? (
                <>
                  <h4>
                    country:
                    <input
                      onBlur={(e) => {
                        setAddress((prevState) => ({
                          ...prevState,
                          country: e.target.value,
                        }));
                      }}
                      placeholder={user.address.country}
                    ></input>
                  </h4>
                </>
              ) : (
                <h4>country: {user.address.country}</h4>
              )}
              {visible ? (
                <>
                  <h4>
                    city:
                    <input
                      onBlur={(e) => {
                        setAddress((prevState) => ({
                          ...prevState,
                          city: e.target.value,
                        }));
                      }}
                      placeholder={user.address.city}
                    ></input>
                  </h4>
                </>
              ) : (
                <h4>city: {user.address.city}</h4>
              )}
              {visible ? (
                <>
                  <h4>
                    street:
                    <input
                      onBlur={(e) => {
                        setAddress((prevState) => ({
                          ...prevState,
                          street: e.target.value,
                        }));
                      }}
                      placeholder={user.address.street}
                    ></input>
                  </h4>
                </>
              ) : (
                <h4>street: {user.address.street}</h4>
              )}
              {visible ? (
                <>
                  <h4>
                    nr:
                    <input
                      onBlur={(e) => {
                        setAddress((prevState) => ({
                          ...prevState,
                          nr: e.target.value,
                        }));
                      }}
                      type="number"
                      placeholder={user.address.nr}
                    ></input>
                  </h4>
                </>
              ) : (
                <h4>nr: {user.address.nr}</h4>
              )}
              {visible ? (
                <>
                  <h4>
                    zipcode:
                    <input
                      onBlur={(e) => {
                        setAddress((prevState) => ({
                          ...prevState,
                          zipcode: e.target.value,
                        }));
                      }}
                      placeholder={user.address.zipcode}
                    ></input>
                  </h4>
                </>
              ) : (
                <h4>zipcode: {user.address.zipcode}</h4>
              )}

              <a
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                <Button
                  margintop={"20px"}
                  width={"100%"}
                  height={"40px"}
                  text={"Change  address"}
                />
              </a>

              {visible ? (
                <a onClick={handleChangeAddress}>
                  <Button
                    margintop={"20px"}
                    width={"100%"}
                    height={"30px"}
                    text={"Submit"}
                  />
                </a>
              ) : (
                <></>
              )}
            </div>
            <div className="address-schema"></div>
          </div>
          <div className="orders">
            {user.orders.length > 1 ? (
              user.orders.map((order, index) => {
                return (
                  <div className="order" key={index}>
                    <h1>Order status: {order.status}</h1>
                    <h3>Order id: {order._id.slice(5)}</h3>
                    <h3>Ordered: {order.createdAt.slice(0, 10)}</h3>
                    <h3>Products:</h3>
                    {order.products.map((product, index) => {
                      return (
                        <Link to={`/product/${product.data._id}`}>
                          <div className="product" key={index}>
                            <img
                              style={{ width: "200px", height: "150px" }}
                              src={product.data.images[0].images[0]}
                            ></img>
                            <div className="product-info">
                              {" "}
                              <h4>{product.data.name}</h4>
                              <h4>${product.data.price}</h4>
                              <h4>quantity: {product.qty}</h4>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                    <h3 className="total">Total: ${order.total}</h3>
                    <hr></hr>
                  </div>
                );
              })
            ) : (
              <h1>No orders yet</h1>
            )}
          </div>
        </>
      )}
    </div>
  );
}
