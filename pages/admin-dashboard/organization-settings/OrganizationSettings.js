import React, { useState, useEffect } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrganizationSettings = () => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar");
    const savedName = localStorage.getItem('name');
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
    if(savedName) {
      setName(savedName);
    }
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
      localStorage.setItem("userAvatar", reader.result); // Save to localStorage
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };



  return (
    <div className="my-20">
      <div className=" w-1/2 mx-auto flex flex-col items-center justify-center">
        <div className="flex justify-center items-center w-full">
          {!avatar ? (
            <label className="flex flex-col justify-center items-center w-64 h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
              <div className="text-gray-700">
                <img className=" w-12 opacity-20" src="/images/upload.svg" />
              </div>
              <p className="text-gray-600 mt-2">Upload a file</p>
              <input
                onChange={handleAvatarChange}
                type="file"
                className="hidden"
                accept="image/*"
              />
            </label>
          ) : (
            <div className="relative">
              <FontAwesomeIcon
                onClick={() => {
                  setAvatar("");
                  localStorage.removeItem("userAvatar");
                }}
                icon={faX}
                className="absolute -top-2 -right-2 border text-black p-1 text-sm w-3 h-3 cursor-pointer rounded-full bg-white"
              />
              <img
                src={avatar}
                alt="Avatar"
                className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
              />
            </div>
          )}
        </div>
        <input
          onChange={(e) => {
            setName(e.target.value);
            localStorage.setItem("name", e.target.value);
          }}
          className="w-full p-1 border rounded-xl focus:outline-none focus:border-primary-accent-color px-4 py-2 mt-8"
          type="text"
          placeholder="Enter your organization name."
          value={name}
        />
        <button type='submit' className="disabled:bg-gray-500 bg-primary-accent-color hover:bg-button-hover-color text-white rounded-xl px-4 py-1 mt-4" onClick={() => window.location.reload()}>Update Profile</button>
      </div>
    </div>
  );
};

export default OrganizationSettings;
