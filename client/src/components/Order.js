import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/context";

export default function Order(props) {
  const [userData, setUserData] = useState({
    weight: "",
    destination: "",
    location: "",
  });

  // eslint-disable-next-line no-unused-vars
  const { parcel, setParcel } = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  const handleChange = (el) => {
    const { name, value } = el.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (el) => {
    const uData = {
      weight: userData.weight,
      location: userData.location,
      destination: userData.destination,
    };

    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(uData),
    };

    fetch("/parcels", reqOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) console.log(data);
        setParcel(data);
        setMsg(data.message);
      })
      .catch((er) => console.log({ Error: er.message }));

    // el.preventDefault();
  };

  return (
    <div className="boxed">
      <h1>Make an order!</h1>
      {msg ? <p>{msg}</p> : <span></span>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="number"
          name="weight"
          value={userData.weight}
          placeholder="Weight in Kgs"
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          value={userData.location}
          placeholder="Location"
          onChange={handleChange}
        />
        <input
          type="text"
          name="destination"
          value={userData.destination}
          placeholder="Destination"
          onChange={handleChange}
        />

        <button type="submit">Order Now</button>
        <Link to="/track">Track Parcel</Link>
      </form>
    </div>
  );
}
