'use client';
// components/Toast.js
import { useEffect } from "react";
import { useToast } from "../../context/ToastContext";
import { faCheck, faCheckCircle, faExclamationCircle, faInfo, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from "framer-motion";

const Toast = () => {
  const { toast, removeToast } = useToast();

  useEffect(() => {
    if (toast?.duration) {
      const timer = setTimeout(() => {
        removeToast();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast, removeToast]);

  if (!toast) return null;

  const typeStyles = {
    info: "border-blue-500",
    success: "border-green-500",
    error: "border-red-500",
  };


  const typeStylesBg = {
    info: "bg-blue-100",
    success: "bg-green-100",
    error: "bg-red-100",
  };


  const typeStylesIcon = {
    info: {
      icon: faInfo,
      color: 'text-blue-500'
    },
    success: {
      icon: faCheckCircle,
      color: 'text-green-500'
    },
    error: {
      icon: faExclamationCircle,
      color: 'text-red-500'
    },
  };

  const typeHeading = {
    info: "Some Important Information",
    success: "Successfully Done",
    error: "Error Occurred"
  }

// Update the variants in your Toast component
const variants = {
  hidden: { y: -50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      type: 'spring', 
      stiffness: 500, // Increased stiffness for a bouncier spring
      damping: 10, // Adjust damping for less oscillation
      mass: 0.3, // Lower mass for quicker movement
      duration: 0.5 // Optional: Control the overall speed of the animation
    } 
  },
  exit: { 
    y: -50, 
    opacity: 0, 
    transition: { 
      type: 'spring', 
      stiffness: 500,
      damping: 10,
      mass: 0.3,
      duration: 0.5
    } 
  },
};


  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className={`fixed z-9999999999 top-14 left-[39%]  px-4 py-4 rounded-lg bg-white shadow-md  text-gray-600 flex items-center justify-between w-1/4 min-w-52  max-w-90 border-b-[12px] box-border  border-solid border ${typeStyles[toast.type]}`}
    >
      <div className='flex items-center'>
        <div className={`mr-2 p-4 rounded-md h-6 w-6 flex items-center justify-center ${typeStylesBg[toast.type]}`}>
          <FontAwesomeIcon icon={typeStylesIcon[toast.type].icon} className={`${typeStylesIcon[toast.type].color}`} />
        </div>
        <div className='flex flex-col'>
          <h1 className='text-sm font-bold  text-gray-600'>{typeHeading[toast.type]}</h1>
          <p className='text-xs text-gray-500'>{toast.message}</p> 
        </div>
      </div>
      <button

        onClick={removeToast}
        className="ml-4 rounded-full p-3 w-4 h-4  border-none text-gray-600 bg-gray-100 font-semibold flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faX} className=' text-xxs' />
      </button>
    </motion.div>
  );
};

export default Toast;
