import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, GetUser } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const User = useSelector((state) => state.user);
  const { loading, error, userInfo } = User;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email: email, password: password }));
  };

  useEffect(() => {
    if (userInfo.token !== undefined) {
      navigate(`/profile`);
    }
  }, [userInfo.token]);  

  return (
    <form onSubmit={handleLogin} className="login">
      {error ? (
        <Alert type={"error"} text={error} />
      ) : (
        <div style={{ height: "70px" }}></div>
      )}
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="email"
        style={
          error == "User not found" || error == "Empty spaces"
            ? { borderBottom: "2px solid #d9534f" }
            : {}
        }
      ></input>
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
        style={
          error == "Wrong password" || error == "Empty spaces"
            ? { borderBottom: "2px solid #d9534f" }
            : {}
        }
      ></input>
      <button type="submit">Login</button>
    </form>
  );
}
