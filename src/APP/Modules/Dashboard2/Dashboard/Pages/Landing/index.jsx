// import React from 'react';
import Button from "../../../../Components/Buttons/Button";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div
      className="h-screen bg-no-repeat bg-cover bg-center pl-10 pr-10"
      style={{
        backgroundImage: 'url("src/APP/Assets/BgimageLanding/Default.png")',
      }}
    >
      <div className="flex flex-col justify-center items-center h-full">
        <div className="bg-white bg-opacity-50 shadow-md rounded-3xl p-1 h-45 border mx-auto w-full md:w-2/3 lg:w-1/3 border-gray-200 transform transition duration-300 hover:shadow-lg hover:scale-105">
          <img
            src="src/APP/Assets/BgimageLanding/exhibit-logo-landing.png"
            alt="Company logo"
            className="p-8 md:p-16 lg:p-20 max-w-xs md:max-w-sm lg:max-w-md"
          />
        </div>

        <h1 className="text-center text-lg md:text-xl lg:text-2xl mb-4">
          Welcome to quickpick school management system.
        </h1>
        <div className="bg-white bg-opacity-50 shadow-md rounded-3xl p-4 md:p-6 lg:p-8 border mx-auto w-full md:w-2/3 lg:w-1/2 border-gray-200 transform transition duration-300 hover:shadow-lg hover:scale-105">
          <div className="flex justify-between">
            <Link to="/parentlogin">
              <Button
                text="Login parent"
                clss="px-4 py-2 bg-blue-500 rounded-md"
              />
            </Link>
            <Link to="/login">
              <Button
                text="Login teacher"
                clss="px-4 py-2 bg-blue-500 rounded-md"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
