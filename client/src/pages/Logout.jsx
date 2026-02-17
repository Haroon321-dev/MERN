import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import axios from "axios";

const URL = "http://localhost:5000/api/route/logout";

export const Logout = () => {
  const { setUser } = useAuth();
  const called = useRef(false); // StrictMode fix

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const logoutUser = async () => {
      try {
        await axios.post(
          URL,
          {}, // body empty hai (logout ke liye data nahi bhej rahe)
          {
            withCredentials: true, // cookies/session ke liye
          }
        );

        setUser("");
        toast.success("Logout Successful!");
      } catch (error) {
        console.log("Logout error:", error);
        toast.error("Logout failed!");
      }
    };

    logoutUser();
  }, [setUser]);

  return <Navigate to="/login" replace />;
};



