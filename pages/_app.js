import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "shepherd.js/dist/css/shepherd.css";
import ToastProvider from "./context/ToastContext";
import Toast from "./common-component/custom-toast/Toast";
import { AnimatePresence } from "framer-motion";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
function MyApp({ Component, pageProps }) {
  const [userDetails, setUserDetails] = useState(null);
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    const storedUserDetails = window.localStorage.getItem("id");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
    setIsMount(true);
  }, []);

  useEffect(() => {
    if (userDetails !== null) {
      window.localStorage.setItem("id", JSON.stringify(userDetails));
    }
  }, [userDetails]);

  return isMount && (
    <ToastProvider>
      <UserContext.Provider value={{ userDetails, setUserDetails }}>
        <Component {...pageProps} />
        <AnimatePresence>
          <Toast />
        </AnimatePresence>
      </UserContext.Provider>
    </ToastProvider>
  )
}

export default MyApp;
