// import React from 'react'
// import ReactDOM from 'react-dom/client'

// import APP from './APP';

// import './index.css';
// import { Provider } from 'react-redux';
// import store from './APP/Redux/store';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//    <Provider store={store}>
//       <APP />
//   </Provider>,
//    </React.StrictMode>,
// )

// import React from 'react'
// import ReactDOM from 'react-dom/client'

// import APP from './APP';

// import './index.css';


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <APP/>
//   </React.StrictMode>,
// )

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./APP/Modules/Dashboard/Pages/Login";
import Dashboard from "./APP/Modules/Dashboard";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
          <Route index element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);