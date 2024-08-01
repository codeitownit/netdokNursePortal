// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../../../../Redux/Actions/AuthSlice';
// import { auth } from '../../../../../../firebaseConfig';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import Cookies from 'js-cookie';
// import { useContext } from "react";
// import AppContext from '../../../../Provider/Context';
// const Login = () => {
//   const {
//     setUser,
//     token,
//     setToken,
//   } = useContext(AppContext);
//   const [email, setEmail] = useState('');
//   const [genToken, setGenToken] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();


//   const handleLogin = async (e) => {
//     e.preventDefault();
//     console.log("clicked");

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       console.log(userCredential.user);
      
//       const token = await userCredential.user.getIdToken();
//       setToken(token)
//       Cookies.set('token', token, { expires: 7 });
      
//       // Dispatch the setUser action correctly
//       dispatch(setUser({ user: userCredential.user.uid, token }));
//     } catch (error) {
//       console.error('Error logging in', error);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
