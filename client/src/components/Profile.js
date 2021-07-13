import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/context";

export default function Profile() {
  const { user, isAuth } = useContext(AuthContext);

  if (isAuth === false)
    return (
      <div className="boxed">
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="boxed boxtile">
      <div>
        <h3>Personal Info</h3>
        <div className="boxtile">
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
      <Link to="/orders">View Orders</Link>
    </div>
  );
}
