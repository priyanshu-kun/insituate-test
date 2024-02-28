import React, { useState, useEffect } from "react";
import logo from "../../public/images/logo.svg";
import Image from "next/image";

const Header = ({ isSticky }) => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar");
    const savedName = localStorage.getItem("name");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
    if (savedName) {
      setName(savedName);
    }
  }, []);

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex flex-col items-center z-10">
          <Image src={logo} width={90} height={90} />
        </div>
        {isSticky ? (
          <div>
            <Image
              src="/images/insituate_light_logo.png"
              alt="insituate-logo"
              width={40}
              height={40}
            />
          </div>
        ) : null}

        <div className="flex items-center">
          <h1>{name ? name : "Dieder Sachs"}</h1>
          <div className="text-xs ml-2 h-10 w-10 rounded-full bg-blue-400 text-white flex items-center justify-center flex-col">
            {avatar ? (
              <img src={avatar} className="w-full h-full rounded-full object-cover" />
            ) : (
              <>
                <p className="mx-1">Dieder</p>
                <div className="flex justify-center">Sachs</div>
              </>
            )}
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default Header;
