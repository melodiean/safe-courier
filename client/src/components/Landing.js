import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/context";

import delivery from "../images/delivery.png";
import Order from "./Order";

export default function Landing() {
  const { user } = useContext(AuthContext);
  if (user.username!=="") return <Order />;
  return (
    <div className="land">
      <img
        src={delivery}
        alt="by Hany Alashkar from Pixabay"
        className="limg"
      />
      <h2>Get your parcel safely and fast</h2>
      <p>
        With Safe Courier, you can make delivery orders and keep track of your
        parcel wherever you are!
      </p>
      <div className="landb">
        <Link to="register">
          <button>SIGNUP</button>
        </Link>
        <Link to="login">
          <button>LOGIN</button>
        </Link>
      </div>
    </div>
  );
}
