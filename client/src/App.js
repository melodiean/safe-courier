import React from "react";
import "./App.scss";

import { Route, Switch } from "react-router-dom";

import { AuthProvider } from "./context/context";

import Header from "./components/Header";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Order from "./components/Order";
import Orders from "./components/Orders";
import OrderDetails from "./components/OrderDetails";
import Track from "./components/Track";
import Footer from "./components/Footer";

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Header />

        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/order" component={Order} />
          <Route path="/orders" component={Orders} />
          <Route path="/details" component={OrderDetails} />
          <Route path="/track" component={Track} />
        </Switch>
      </AuthProvider>

      <Footer />
    </div>
  );
}

export default App;
