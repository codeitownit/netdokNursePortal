
// import { signInWithEmailAndPassword } from "firebase/auth";
// import React, { useState, useEffect, useContext } from "react";
// import { auth } from "../../../../../../firebaseConfig";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Logo from "../../../../Components/SideBar2/Btns/Assets/exhibit-logo.jpeg"
// import useaxios from "../../../../Hooks/useAxios";
// import AppContext from "../../../../Provider/Context";

// function Login() {
//   const {
//     user,
//     login,
//     token,
//     setToken,
//   } = useContext(AppContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [userCredentials, setUserCredentials] = useState({ doctorId: "", access: "" });

//   const request = useaxios();

//   function redirectToDashboard() {
//     window.location.href = "/dashboard";
//   }

//   useEffect(() => {
//     if (userCredentials.doctorId && userCredentials.access) {
//       fetchData();
//     }
//   }, [userCredentials]);
//   useEffect(() => {
//     if (token) {
//       logUser();
//     }
//   }, [token]);

//   async function fetchData() {
//     console.log("fetch started");
//     try {
//       const res = await request({
//         method: "GET",
//         url: `primeDoctor/userinfo/${userCredentials.doctorId}`,
//         auth: false,
//       });

//       if (res !== "error") {
//         res?.data.forEach((item) => {
//           if (item?.docType && item?.docType === "nurse") {
//             login(item);
//             setToken(userCredentials.access);
//           } else {
//             toast.error("Unauthorized access");
//           }
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

//   async function logUser() {
//     console.log(user);
//     console.log(token);
//     toast.success("User logged in Successfully");
//     setTimeout(redirectToDashboard, 3000);
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       setUserCredentials({
//         doctorId: userCredential.user.uid,
//         access: userCredential.user.accessToken,
//       });
//       // Save user info to localStorage
//       localStorage.setItem("primeDoctorUserId", userCredential.user.uid);
//       localStorage.setItem("primeDoctorUserEmail", userCredential.user.email);
//       localStorage.setItem("serId", userCredential.user.accessToken);
//     } catch (error) {
//       console.log(error);
//       setError(error.message);

//       toast.error(error.message, {
//         position: "bottom-center",
//       });
//     }
//   };
  

  // return (
  //   <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-50 to-gray-200">
  //     <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
  //       <div className="flex justify-center">
  //     <img src={Logo} alt="" style={{height:"4em"}} />
  //     </div>
  //       <h1 className="text-3xl font-bold text-center text-gray-800">Log in to your account</h1>
  //       <ToastContainer />
  //       <form onSubmit={handleSubmit} className="space-y-6">
  //         <div className="flex flex-col">
  //           <label className="text-sm font-medium text-gray-700">Email address</label>
  //           <input
  //             type="email"
  //             className="mt-2 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //             placeholder="Enter email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //           />
  //           {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  //         </div>

  //         <div className="flex flex-col">
  //           <label className="text-sm font-medium text-gray-700">Password</label>
  //           <input
  //             type="password"
  //             className="mt-2 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //             placeholder="Enter password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //           />
  //           {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  //         </div>

  //         <div className="flex justify-end text-sm">
  //           <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
  //         </div>

  //         <div className="flex justify-center">
  //           <button
  //             type="submit"
  //             className="w-full py-3 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
  //           >
  //             Login
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );
// }

// export default Login;



import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../../../../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../../../Components/SideBar2/Btns/Assets/exhibit-logo.jpeg"

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
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-50 to-gray-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center">
      <img src={Logo} alt="" style={{height:"4em"}} />
      </div>
        <h1 className="text-3xl font-bold text-center text-gray-800">Log in to your account</h1>
        <ToastContainer />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              className="mt-2 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-2 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          </div>

          <div className="flex justify-end text-sm">
            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;