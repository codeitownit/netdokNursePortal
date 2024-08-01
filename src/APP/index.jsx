// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Provider, useDispatch } from 'react-redux';
// import store, { setUser } from './Redux/store';
// import Login from './Modules/Dashboard/Pages/Login/ParentLogin';
// import Dashboard from './Modules/Dashboard';
// import PrivateRoute from './Routes/PrivateRoute';
// import Cookies from 'js-cookie';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import AllRoutes from './Routes';
// import AppProvider from "./Provider";


// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const token = Cookies.get('token');
//     if (token) {
//       const auth = getAuth();
//       onAuthStateChanged(auth, (user) => {
//         if (user) {
//           const se = 
//            user.uid
         
//           dispatch(setUser({ se, token }));
//         }
//       });
//     }
//   }, [dispatch]);

//   return (
//     <AppProvider>
//     <Provider store={store}>
//           <AllRoutes />
//     </Provider>
//     </AppProvider>
//   );
// }

// export default App;


import AppProvider from "./Provider";

import AllRoutes from "./Routes";

function APP() {
  return (
    <AppProvider>
      <AllRoutes />
    </AppProvider>
  );
}

export default APP;


// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./Modules/Dashboard/Pages/Login";
// import Dashboard from "./Modules/Dashboard";
// import PrivateRoutes from "./Routes/PrivateRoute";
// import { AuthProvider } from "./Redux/Actions/AuthContext";
// const App = () => {
//   return (
//     <Router>
//       <AuthProvider>
//         {" "}
//         <Routes>
//           <Route element={<PrivateRoutes />}>
//             {" "}
//             <Route path="/dashboard" element={<Dashboard />} />
//           </Route>
//           <Route path="/" element={<Login />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// };

// export default App