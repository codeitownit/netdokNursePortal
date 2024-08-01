// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Cookies from 'js-cookie';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const token = useSelector((state) => state.auth.token) || Cookies.get('token');

//   return (
//     <Route
//       {...rest}
//       element={token ? <Component /> : <Navigate to="/login" />}
//     />
//   );
// };

// export default PrivateRoute;

//.................................................................................
// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Cookies from 'js-cookie';

// const PrivateRoute = ({ children }) => {
//   const token = useSelector((state) => state.auth.token) || Cookies.get('token');

//   return token ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('primeDoctorUserId'); // Adjust this according to your authentication logic

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const doctor = localStorage.getItem("primeDoctorUserId");
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         doctor && doctor !== "" ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/login" />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;

//././..//................................................................

// import { Outlet, Navigate } from "react-router-dom";
// import { useAuth } from "./AuthProvider";

// const PrivateRoutes = () => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };
// export default PrivateRoutes;