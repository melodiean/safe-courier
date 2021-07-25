import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/context";

function Box(props) {
  let text = props.text;
  let dbc = props.dbc;

  return (
    <div className="boxtile">
      <p className="hightext">{text}</p>
      <span className="lowtext">{dbc}</span>
    </div>
  );
}

function Parcel() {
  const { parcel } = useContext(AuthContext);
  let pid = parcel.oid;

  const [order, setOrder] = useState("");

  const f = async () => {
    if (pid) {
      let res = await fetch(`/api/v1/parcels/${pid}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setOrder(data);
        })
        .catch((er) => console.log(er.message));

      return res;
    }
  };

  useEffect(() => {
    f();
  });

  return (
    <div>
      <Box text="Track No." dbc={order.trackingNo} />
      <Box text="Status" dbc={order.status} />
      <Box text="Weight" dbc={order.weight} />
      <Box text="Cost" dbc={order.cost} />
      <Box text="From" dbc={order.location} />
      <Box text="To" dbc={order.destination} />
    </div>
  );
}

function Button(props) {
  const { parcel } = useContext(AuthContext);
  const pid = parcel.oid;
  const text = props.text;
  const url = `/api/v1/parcels/${pid}${props.url}`;

  const [msg, setMsg] = useState("");

  const reqOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const onClick = async () => {
    await fetch(url, reqOptions)
      .then((r) => r.json())
      .then((d) => {
        setMsg(d.message);
      })
      .catch((er) => console.log({ Error: er.message }));
  };

  return (
    <div>
      {msg ? <p>{msg}</p> : <p></p>}
      <button onClick={onClick} url={url}>
        {text}
      </button>
    </div>
  );
}

export default function OrderDetails() {
  const { user } = useContext(AuthContext);
  let role = user.role;

  if (!role) {
    return (
      <div className="boxed box">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="boxed box">
      <h1>Order Details</h1>
      <Parcel />
      {role === "user" ? (
        <div>
          <Button text="Change Destination" url="/destination" />
          <Button text="Cancel Order" url="/cancel" />
          <Link to="/track">Track Parcel</Link>
        </div>
      ) : (
        <div>
          <Button text="Change Status" url="/status" />
          <Button text="Change Location" url="/presentLocation" />
        </div>
      )}
    </div>
  );
}
