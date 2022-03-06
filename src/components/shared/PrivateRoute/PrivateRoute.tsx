import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

type IProps = RouteProps & {
  isAuth?: boolean;
};

const PrivateRoute: FC<IProps> = ({
  component: Component,
  isAuth,
  ...rest
}) => {
  if (!Component) return null;
  // const token = localStorage.getItem("token");
  const token = true

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
