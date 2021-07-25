import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/context";

function Ords() {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const uid = user.UID;
  const role = user.role;
  const [loading, setLoading] = useState(true);

  const [ord, setOrds] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const { parcel, setParcel } = useContext(AuthContext);

  const handleOrder = (o) => {
    let oid = o.currentTarget.id;
    setParcel({ oid });
    history.push("/details");
  };

  const f = async () => {
    let url;

    let userUrl = `/api/v1/users/${uid}/parcels`;

    let adminUrl = "/api/v1/parcels";

    if (role === "admin") {
      url = adminUrl;
    } else {
      url = userUrl;
    }

    if (uid) {
      let res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setOrds(data);
        })
        .catch((er) => console.log(er.message))
        .finally(() => {
          setLoading(false);
        });

      return res;
    }
  };

  useEffect(
    () => {
      f();
      return setLoading(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // &&

  if (loading)
    return (
      <div className="">
        <p>Loading...</p>
      </div>
    );
  return (
    <div>
      {ord.map((od) => (
        <div key={od._id} className="boxo" id={od._id} onClick={handleOrder}>
          <div className="boxor">
            <span>{od.orderDate.substr(0, 10)}</span>
          </div>
          <div className="boxod">
            <span>Shipped:</span>
            <span>{od.shipDate}</span>
          </div>
          <div className="boxod">
            <span>TrackID:</span>
            <span>{od.trackingNo}</span>
          </div>
          <div className="boxod">
            <span>Weight: </span>
            <span>{od.weight} Kg</span>
          </div>
          <div className="boxod">
            <span>Price: </span>
            <span>{od.cost} UGX</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Orders() {
  return (
    <div className="boxed">
      <h1>Orders</h1>
      <Ords />
      <div className="boxodo">
        <Link to="/order">Make an Order!</Link>
        <Link to="/track">Track a Parcel!</Link>
      </div>
    </div>
  );
}
