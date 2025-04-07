import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:4030/quiz", { withCredentials: true });
        setUser(res.data.user);
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.get("http://localhost:4030/logout", { withCredentials: true });
      setIsLoggedIn(false);
      setUser({ username: "", email: "" });
    } catch (err) {
      console.log("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
