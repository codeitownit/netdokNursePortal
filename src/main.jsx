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

import React from 'react'
import ReactDOM from 'react-dom/client'

import APP from './APP';

import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <APP/>
  </React.StrictMode>,
)

