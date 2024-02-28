'use client';
import React, { useContext, useState } from "react";
import Image from "next/image";
import { UserContext } from "../_app";
import useLogin from "./useLogin";
import { ToastContainer } from "react-toastify";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginPage = () => {
  const userData = useContext(UserContext);
  const { userDetails } = userData || {};
  const [hidePassword, setHidePassword] = useState(true);

  const [idPassword, setIdPassword] = useState({
    id: "admin",
    password: "admin",
  });
  const { isLoading, handleLogin } = useLogin({ idPassword });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIdPassword((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative w-full h-screen">
      <ToastContainer />
      <div className="absolute top-1/2 left-1/2 w-3/4 h-3/4 -z-50 transform -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/images/insituate_light_logo.png"
          layout="fill"
          quality={100}
          objectPosition="center"
          objectFit="contain"
          className="opacity-5"
          alt="Insituate Logo"
        />
      </div>
      <div className="flex flex-col justify-center pt-6 items-center z-10">
        <strong className="text-2xl">INSITUATE</strong>
        <p className=" text-primary-accent-color text-lg" style={{ marginTop: "-8px" }}>
          Secure AI
        </p>
      </div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-center z-10 w-full"
      >
        <h1 className="text-gray-600 mb-3 text-2xl">Login</h1>
        <div className="w-5/12">
          <input
            name="id"
            type="text"
            onChange={handleInputChange}
            required
            placeholder="Key Id"
            className="w-full h-12 shadow-input-shadow pt-1.5 pb-1.5 pl-6 border border-primary-accent-color border-opacity-60 rounded-xl mt-1 focus:outline-none focus:border-indigo-800"
          />
        </div>
        <div className="w-5/12 mt-4 relative">
          <input
            type={hidePassword ? "password": "text"}
            required
            onChange={handleInputChange}
            name="password"
            placeholder="Password"
            className="w-full h-12 shadow-input-shadow pt-1.5 pb-1.5 pl-6 border border-primary-accent-color border-opacity-60 rounded-xl mt-1 focus:outline-none focus:border-indigo-800"
          />
          <button type='button' className='absolute  top-1/2 right-6 opacity-60 transform -translate-y-1/2' onClick={() => setHidePassword((prev) => !prev)}><FontAwesomeIcon icon={hidePassword ? faEyeSlash: faEye} /></button>
        </div>
        <div className="mt-8">
          <button
            disabled={isLoading}
            type="submit"
            className="disabled:bg-gray-500 bg-primary-accent-color hover:bg-button-hover-color text-white w-full rounded-xl px-16 py-2 mb-4 h-12"
          >
            {isLoading ? "Loading..." : "Enter"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
