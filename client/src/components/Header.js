import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/context";

export default function Header() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = async () => {
    await fetch("/api/v1/auth/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((d) => {
        setIsAuth(false);
      })
      .catch((er) => console.log(er.message));
  };

  if (isAuth)
    return (
      <div className="header">
        <Link to="/order">SafECoURiEr</Link>
        <Link to="/profile">Account</Link>
        <Link to="/" onClick={logout}>
          Logout
        </Link>
      </div>
    );
  return (
    <div className="header">
      <Link to="/">SafECoURiEr</Link>
    </div>
  );
}
