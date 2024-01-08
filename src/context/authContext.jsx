import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { checkToken } from "../services/login";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const getToken = useCallback(() => {
    const token = localStorage.getItem("token") || null;
    return token;
  }, []);

  const handleCheckToken = useCallback(async () => {
    const token = getToken();
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && !isAuth) {
      const check = await checkToken();

      if (check.token) {
        setUser(user);
        setIsAuth(true);
      } else {
        setIsAuth(false);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.reload();
      }
    }
  }, [getToken, isAuth]);

  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);

  if (!isAuth && getToken()) return null;

  return (
    <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
