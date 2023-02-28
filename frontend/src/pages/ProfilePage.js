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
        </>
      )}
    </div>
  );
}
