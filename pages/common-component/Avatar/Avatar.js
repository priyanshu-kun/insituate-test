import React from "react";
import randomAvatars from "../../utils/randomAvatars";

function Avatar({ seed }) {
  return (
    <div
      className=" rounded-lg overflow-hidden w-10 h-10 mr-4 min-w-10 -mb-1"
      dangerouslySetInnerHTML={{ __html: randomAvatars(seed).workspace_avatar }}
    ></div>
  );
}

export default Avatar;
