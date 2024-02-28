'use client';
// contexts/ToastContext.js
import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const addToast = useCallback((message = "There is nothing to show here.", type = 'info', duration = 3000) => {
    setToast({ message, type, duration });
    setTimeout(() => {
      setToast(null);
    }, duration);
  }, []);

  const removeToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

export default ToastProvider;