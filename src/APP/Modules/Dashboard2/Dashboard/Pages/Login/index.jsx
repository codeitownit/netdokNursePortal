import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import useaxios from "../../../../Hooks/useAxios";
import TextInput2 from "../../../../Components/Inputs/TextInput2";
import AppContext from "../../../../Provider/Context";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, setToken, setUserPermission } = useContext(AppContext);

  const request = useaxios();

  const loginUser = async () => {
    const res = await request({
      method: "POST",
      url: "login",
      data: {
        email: email,
        password: password,
      },
      auth: false,
    });

    if (res === "error") {
      return;
    }

    //console.log(res)

    setUser(res || null);
    setToken(res?.token || null);
    setUserPermission(res?.role || null);

    navigate("/dashboard");
  };

  const handleLogin = (event) => {
    event.preventDefault();
    loginUser();
  };

  return (
    <div
      className="font-quicksand flex justify-center items-center h-screen bg-gray-200 bg-center bg-no-repeat bg-cover relative border-t-2 border-b-2 border-gray-500"
      style={{ backgroundImage: 'url("src/APP/Assets/BgLogin/bg_login.png")' }}
    >
      <div
        className="w-2/3 md:w-1/2 lg:w-1/3 h-3/4 p-6 shadow-lg bg-0E2F59 bg-opacity-25 rounded-lg"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <h1 className="text-3xl p-6 block text-center font-bold mt-12">
          LOG IN TO YOUR ACCOUNT
        </h1>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col items-center justify-center text-sm text-gray-700 font-semibold">
            <div className="flex justify-center mt-9 mx-11 w-4/5 md:w-1/2 lg:w-2/3">
              <TextInput2
                className="h-10 rounded-full p-3 mb-3 w-full"
                placeholder="Example@gxxxx.com"
                label="EMAIL"
                directInput={true}
                transform="false"
                stateInput={email}
                setStateInput={setEmail}
              />
            </div>
            <div className="flex justify-center mt-6 mx-11 w-4/5 md:w-1/2 lg:w-2/3">
              <TextInput2
                className="h-10 rounded-full p-3 w-full"
                type="password"
                placeholder="Password"
                label="PASSWORD"
                directInput={true}
                transform="none"
                stateInput={password}
                setStateInput={setPassword}
              />
            </div>
          </div>
          <div className="flex justify-center mt-3 font-semibold">
            <a href="#">
              Forgot password? <span className="text-blue-700">Reset</span>
            </a>
          </div>
          <div className="mt-7 flex justify-center font-semibold">
            <button
              className="border-1 border-black bg-gray-200 text-black py-1 w-1/2 md:w-1/5 lg:w-1/5 rounded-full hover:bg-gray-500 font-bold flex items-center"
              type="submit flex"
            >
              <BsArrowRightCircle
                className="mx-2 bg-yellow-500 rounded-full"
                size={30}
              />
              <p>Login</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
