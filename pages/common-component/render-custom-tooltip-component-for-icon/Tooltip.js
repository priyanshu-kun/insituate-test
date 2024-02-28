'use client';
import React, {useState, useEffect} from 'react'

function Tooltip({ icon, tooltipText, isOverflowing = false }) {
  const [showTooltip, setShowToolTip] = useState(false);

  const handleMouseEnter = (e) => {
    setShowToolTip(true);
  }
  
  const handleMouseLeave = (e) => {
    setShowToolTip(false);
  }


  return (
    <div className='relative inline-block' >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className=' cursor-pointer'
      >
        {icon}
      </div>
      {showTooltip && (
        <div
        className={`absolute -bottom-full -left-1/2 transform translate-y-1/3 ${isOverflowing ? "-translate-x-20": "-translate-x-5"}    bg-white shadow-lg text-gray-600 text-xs rounded-md z-50 ${isOverflowing ? "w-32": "w-28"} h-8 flex items-center justify-center border box-border`}
      >
        {tooltipText}
      </div>
      )}
    </div>
  );
}

export default Tooltip