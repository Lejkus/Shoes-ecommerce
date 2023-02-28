import React from "react";
import Login from "../components/User/Login";
import Register from "../components/User/Register";

export default function LoginPage() {
  return (
    <div className="login-page">
      <Login />
      <Register />
    </div>
  );
}
