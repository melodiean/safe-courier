import React, { useState
  , useContext 
} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/context";
import Order from "./Order";

export default function Login() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const [err, setErr] = useState("");

  
  const userInfo = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState(userInfo);
  
  const handleChange = (el) => {
    const { name, value } = el.target;
    setUserData({ ...userData, [name]: value });
  };
  
  const handleSubmit = (el) => {

    const uData = {
      email: userData.email,
      password: userData.password,
    };

    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(uData),
    };

    fetch("/api/v1/auth/login", reqOptions)
      .then((res) => res.json())
      .then((data) => {
        if (!data.isAuth) 
          setErr(data.message);
          setIsAuth(true)
      })
      .catch((er) => {
        console.log({ Error: er.message });
      });

    el.preventDefault();
  };

  if (isAuth) return <Order />;

  return (
    <div className="boxed">
      <h1>Login Here!</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        {err ? <p>{err}</p> : <span></span>}
        <input
          type="email"
          name="email"
          value={userData.email}
          placeholder="Enter Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button type="submit">LOGIN</button>
        <Link to="/register">Not a member?</Link>
      </form>
    </div>
  );
}
