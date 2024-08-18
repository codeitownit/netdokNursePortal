import React, {useContext} from "react";
import { Navigate, Outlet} from "react-router-dom";
import AppContext from "../../Provider/Context";

const PrivateRoute = () => {
  const user = useContext(AppContext);
  if (!user.token) return <Navigate to="/" />;
  return <Outlet />;
};

export default PrivateRoute;