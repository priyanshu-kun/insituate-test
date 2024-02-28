'use client';
import React from 'react'

function SecondaryButton({ styles="", text="", icon="" }) {
  return (
    <button className={` bg-secondary-accent-color rounded-lg text-primary-accent-color py-2 px-6  w-fit text-center transition-all cursor-pointer text-sm ${styles}`}>
       <span>{text}</span> 
        {
          icon && <img className='w-5 h-auto ml-2' src={icon} />
        }
    </button>
  )
}

export default SecondaryButton;