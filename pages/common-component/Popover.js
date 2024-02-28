'use client';
import React from "react";
import PropTypes from "prop-types";

const Popover = ({ children, position = "bottom" }) => {
  return (
    <div className="w-full inline-block">
      <div
        className={`absolute ${
          position === "top" ? "bottom-full" : "top-full"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  showDropDown: PropTypes.bool.isRequired,
  setShowDropDown: PropTypes.func.isRequired,
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
};

export default Popover;
