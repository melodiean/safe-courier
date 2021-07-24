import React, { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState({
    isAuth: false,
    UID: "",
    email: "",
    username: "",
    role: "",
  });

  const [isAuth, setIsAuth] = useState(false);
  const [parcel, setParcel] = useState("");

  const authUser = async () => {
    const res = await fetch("/auth/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.isAuth) {
          setUser(d);
          setIsAuth(d.isAuth);
        }
        // setIsAuth(false);
      })
      .catch((er) => {
        console.log({Error:er.message});
        
      });

    return res;
  };

  useEffect(() => {
    authUser();
  }
  , []
  );

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setUser,
        isAuth: isAuth,
        setIsAuth: setIsAuth,
        parcel: parcel,
        setParcel: setParcel,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
