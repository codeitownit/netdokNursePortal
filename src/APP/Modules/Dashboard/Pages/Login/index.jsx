// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BsArrowRightCircle } from "react-icons/bs";
// import useaxios from "../../../../Hooks/useAxios";
// import TextInput2 from "../../../../Components/Inputs/TextInput2";
// import AppContext from "../../../../Provider/Context";

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { setUser, setToken, setUserPermission } = useContext(AppContext);

//   const request = useaxios();

//   const loginUser = async () => {
//     const res = await request({
//       method: "POST",
//       url: "login",
//       data: {
//         email: email,
//         password: password,
//       },
//       auth: false,
//     });

//     if (res === "error") {
//       return;
//     }

//     //console.log(res)

//     setUser(res || null);
//     setToken(res?.token || null);
//     setUserPermission(res?.role || null);

//     navigate("/dashboard");
//   };

//   const handleLogin = (event) => {
//     event.preventDefault();
//     loginUser();
//   };

//   return (
//     <div
//       className="font-quicksand flex justify-center items-center h-screen bg-gray-200 bg-center bg-no-repeat bg-cover relative border-t-2 border-b-2 border-gray-500"
//       style={{ backgroundImage: 'url("src/APP/Assets/BgLogin/bg_login.png")' }}
//     >
//       <div
//         className="w-2/3 md:w-1/2 lg:w-1/3 h-3/4 p-6 shadow-lg bg-0E2F59 bg-opacity-25 rounded-lg"
//         style={{ backdropFilter: "blur(8px)" }}
//       >
//         <h1 className="text-3xl p-6 block text-center font-bold mt-12">
//           LOG IN TO YOUR ACCOUNT
//         </h1>
//         <form onSubmit={handleLogin}>
//           <div className="flex flex-col items-center justify-center text-sm text-gray-700 font-semibold">
//             <div className="flex justify-center mt-9 mx-11 w-4/5 md:w-1/2 lg:w-2/3">
//               <TextInput2
//                 className="h-10 rounded-full p-3 mb-3 w-full"
//                 placeholder="Example@gxxxx.com"
//                 label="EMAIL"
//                 directInput={true}
//                 transform="false"
//                 stateInput={email}
//                 setStateInput={setEmail}
//               />
//             </div>
//             <div className="flex justify-center mt-6 mx-11 w-4/5 md:w-1/2 lg:w-2/3">
//               <TextInput2
//                 className="h-10 rounded-full p-3 w-full"
//                 type="password"
//                 placeholder="Password"
//                 label="PASSWORD"
//                 directInput={true}
//                 transform="none"
//                 stateInput={password}
//                 setStateInput={setPassword}
//               />
//             </div>
//           </div>
//           <div className="flex justify-center mt-3 font-semibold">
//             <a href="#">
//               Forgot password? <span className="text-blue-700">Reset</span>
//             </a>
//           </div>
//           <div className="mt-7 flex justify-center font-semibold">
//             <button
//               className="border-1 border-black bg-gray-200 text-black py-1 w-1/2 md:w-1/5 lg:w-1/5 rounded-full hover:bg-gray-500 font-bold flex items-center"
//               type="submit flex"
//             >
//               <BsArrowRightCircle
//                 className="mx-2 bg-yellow-500 rounded-full"
//                 size={30}
//               />
//               <p>Login</p>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;



// LoginComponent.js
// import React, { useState } from 'react';
// import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (validateInput(email, password)) {
//       try {
//         const auth = getAuth();
//         if (auth.currentUser) {
//           await signOut(auth);
//         }
        // const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // localStorage.setItem("primeDoctorUserId", userCredential.user.uid);
//         window.alert("success");
//       } catch (error) {
//         handleError(error);
//       }
//     } else {
//       alert("Enter valid values");
//     }
//   };

//   const validateInput = (email, password) => {
//     return email.length >= 4 && password.length >= 4;
//   };

//   const handleError = (error) => {
//     if (error.code === 'auth/wrong-password') {
//       alert('Wrong password.');
//     } else {
//       alert(error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <div>
//         <label>Email:</label>
//         <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//       </div>
//       <button type="submit" id="sign-in">Sign In</button>
//     </form>
//   );
// };

// export default Login;




import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../../../../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import SignInwithGoogle from "./signInWIthGoogle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  function redirectToDashboard() {
    window.location.href = "/dashboard";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in Successfully");
      localStorage.setItem("primeDoctorUserId", userCredential.user.uid);
      localStorage.setItem("primeDoctorUserEmail", userCredential.user.email);
      localStorage.setItem("serId", userCredential.user.accessToken);
      // if(!error){
        // }
console.log(userCredential)


      console.log("User logged in Successfully");
      console.log(auth)
      setTimeout(redirectToDashboard, 3000);
      // window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      setError(error.message)

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
        <div
      className="font-quicksand flex justify-center items-center h-screen bg-gray-50 bg-center bg-no-repeat bg-cover relative border-t-2 border-b-2 border-gray-500"
//       style={{ backgroundColor: 'white' }}
    >
        <div
        className="w-2/3 md:w-1/2 lg:w-1/3 h-3/4 p-6 shadow-lg bg-#0E2F59 bg-opacity-25 rounded-lg"
        // style={{ backdropFilter: "blur(8px)" }}
      >
        <div><img src="" alt="" /></div>
        <h1 className="text-xl p-6 block text-center font-bold mt-12">
          LOG IN TO YOUR ACCOUNT
        </h1>
        <ToastContainer />
    <form onSubmit={handleSubmit}>
    <div className="flex flex-col justify-center text-sm text-gray-700 font-semibold">
            <div className="flex justify-center flex-col mt-10 mx-16 w-full md:w-1/2 lg:w-2/3">
            <label className="mx-2 mb-3">Email address</label>
        <input
          type="email"
          className="form-control h-10 rounded-md border-solid border-t-2 border-b-2 border-s-2 p-3 mb-3 w-full"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex justify-center flex-col mt-2 mx-16 w-full md:w-1/2 lg:w-2/3">
      <label className="mx-2 mb-3">Password</label>
        <input
          type="password"
          className="form-control h-10 rounded-md border-solid border-t-2 border-b-2 border-s-2 p-3 w-full"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
</div>
      <div className="d-grid mt-8 flex justify-center font-semibold">
        <button type="submit" className="btn btn-secondary border-1 border-black bg-green-500 text-white py-3 px-6 w-1/2 md:w-1/5 lg:w-1/5 rounded-md hover:bg-green-400 font-bold from-neutral-400 flex items-center">
          Login
        </button>
      </div>
      
      {/* <SignInwithGoogle/> */}
    </form>
    </div>
    </div>
  );
}

export default Login;