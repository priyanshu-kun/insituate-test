import Image from "next/image";
import cardImageDark from "../../../public/images/insituate_dark.png";
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Note({ datetime, description, title, type, setDrawer }) {
  return (
    <div  className="flex px-12 py-10 border border-gray-200 rounded-3xl justify-between items-center shadow-llm_card_shadow bg-[#0D1623] mb-8 overflow-hidden relative cardAnimation ">
      <div>
        <div className="mb-4">
          <button className="text-xs bg-red-100 py-1 px-3 rounded-xl mr-2">
            {type}
          </button>
          <button className="text-xs bg-blue-100 py-1 px-3 rounded-xl">
           {datetime} 
          </button>
        </div>
        <div className='my-6'>
          <h1 className="font-black text-white mb-2 text-2xl">{title}</h1>
          <p className="text-md text-gray-200 w-3/4">
            {description}
          </p>
        </div>
        <button onClick={() => setDrawer(prev => !prev)} className=" border border-gray-200 rounded-lg  mr-3 text-sm py-2 px-6 transition-all hover:bg-white/10 text-gray-200">
          View{" "}
          <FontAwesomeIcon
            icon={faArrowUpLong}
            className="ml-1 transform rotate-45"
          />
        </button>
      </div>
      <Image
        src={cardImageDark}
        className=" h-auto w-96 absolute top-1/2 transform -translate-y-1/2  -right-32 opacity-30"
      />
    </div>
  );
}

export default Note;
