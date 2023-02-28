import React, { useEffect, useMemo, useState } from "react";
import { RegisterUser } from "../../actions/userActions";
import Alert from "../Alert";

export default function Register() {
  const [data, setData] = useState({
    name: null,
    surname: null,
    email: null,
    password: null,
    country: null,
    city: null,
    zipcode: null,
    street: null,
    nr: null,
  });
  const [alert, setAlert] = useState({ text: null });
  const [count, setCount] = useState(0);

  const handleDataChange = (type, text) => {
    switch (type) {
      case "name":
        setData((prevState) => ({
          ...prevState,
          name: text,
        }));
        break;
      case "surname":
        setData((prevState) => ({
          ...prevState,
          surname: text,
        }));
        break;
      case "email":
        setData((prevState) => ({
          ...prevState,
          email: text,
        }));
        break;
      case "password":
        setData((prevState) => ({
          ...prevState,
          password: text,
        }));
        break;
      case "country":
        setData((prevState) => ({
          ...prevState,
          country: text,
        }));
        break;
      case "city":
        setData((prevState) => ({
          ...prevState,
          city: text,
        }));
        break;
      case "zip":
        setData((prevState) => ({
          ...prevState,
          zipcode: text,
        }));
        break;
      case "street":
        setData((prevState) => ({
          ...prevState,
          street: text,
        }));
        break;
      case "nr":
        setData((prevState) => ({
          ...prevState,
          nr: text,
        }));
        break;
      default:
        break;
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    RegisterUser(data)
      .then((response) => {
        if (response.data.Error) {
          setAlert({ type: "error", text: response.data.Error });
          setCount(count + 1);
        } else if (response.data.Success) {
          setAlert({ type: "success", text: response.data.Success });
          setCount(count + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleRegister} className="register">
      {alert.text ? (
        <Alert type={alert.type} text={alert.text} c={count} />
      ) : (
        <div style={{ height: "70px" }}></div>
      )}
      <input
        onChange={(e) => {
          handleDataChange("name", e.target.value);
        }}
        placeholder="name"
        style={
          alert.text == "Empty spaces"
            ? { borderBottom: "2px solid #d9534f" }
            : {}
        }
      ></input>
      <input
        onChange={(e) => {
          handleDataChange("surname", e.target.value);
        }}
        placeholder="surname"
        style={
          alert.text == "Empty spaces"
            ? { borderBottom: "2px solid #d9534f" }
            : {}
        }
      ></input>
      <input
        onChange={(e) => {
          handleDataChange("email", e.target.value);
        }}
        placeholder="email"
        style={
          alert.text == "email already registered" ||
          alert.text == "Empty spaces"
            ? { borderBottom: "2px solid #d9534f" }
            : {}
        }
      ></input>
      <input
        onChange={(e) => {
          handleDataChange("password", e.target.value);
        }}
        placeholder="password"
        style={
          alert.text == "Empty spaces"
            ? { borderBottom: "2px solid #d9534f" }
            : {}
        }
      ></input>

      <div className="input-container">
        <input
          placeholder="country"
          onChange={(e) => {
            handleDataChange("country", e.target.value);
          }}
          style={{ width: "140px" }}
        ></input>
        <input
          placeholder="city"
          onChange={(e) => {
            handleDataChange("city", e.target.value);
          }}
          style={{ width: "140px" }}
        ></input>
        <input
          style={{ width: "70px" }}
          placeholder="zip"
          // pattern="^\s*?\d{5}(?:[-\s]\d{4})?\s*?$"
          onChange={(e) => {
            handleDataChange("zip", e.target.value);
          }}
        ></input>
      </div>
      <div className="input-container">
        <input
          placeholder="street"
          onChange={(e) => {
            handleDataChange("street", e.target.value);
          }}
          style={{ width: "330px" }}
        ></input>
        <input
          placeholder="nr"
          max="999"
          type="number"
          onChange={(e) => {
            handleDataChange("nr", e.target.value);
          }}
          style={{ width: "50px" }}
        ></input>
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
