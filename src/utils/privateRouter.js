import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        (email, token) ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;