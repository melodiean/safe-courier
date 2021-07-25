import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

export default function Register() {
  const [isAuth, setIsAuth] = useState(false);
  const [err, setErr] = useState("");
  const [admin, setAdmin] = useState(false);

  const userInfo = {
    email: "",
    username: "",
    password: "",
    password2: "",
  };

  const [info, setInfo] = useState(userInfo);

  const handleChange = (el) => {
    const { name, value } = el.target;
    setInfo({ ...info, [name]: value });
  };

  const adminSignup = async () => {
    setAdmin(true);
  };

  const handleSubmit = (elm) => {
    let Qdata = {
      email: info.email,
      username: info.username,
      password: info.password,
      current_password: info.password2,
    };

    if (admin) {
      Qdata = {
        ...Qdata,
        role: "admin",
      };
    } else {
      Qdata = { ...Qdata };
    }

    const url = "/api/v1/auth/signup";

    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Qdata),
    };

    fetch(url, reqOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setIsAuth(data.success);
          // console.log(data)
        }
        setErr(data.message);
      })
      .catch((er) => {
        console.log({ Error: er });
      });

    elm.preventDefault();
  };

  if (isAuth) {
    return <Login />;
  }
  return (
    <div className="boxed">
      <h1>Register Here!</h1>
      {err ? <p>{err}</p> : <p></p>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={info.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="username"
          value={info.username}
          onChange={handleChange}
          placeholder="Username"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={info.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password2"
          placeholder="Enter Password Again"
          value={info.password2}
          onChange={handleChange}
        />

        <button type="submit">SUBMIT</button>
        <Link to="/login">Already a member? Login Here!</Link>
        <button type="submit" onClick={adminSignup}>
          ADMIN SIGNUP
        </button>
        {/* <Link onClick={adminSignup}>
          Register as Admin
        </Link> */}
      </form>
    </div>
  );
}
