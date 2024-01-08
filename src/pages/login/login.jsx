import { useState } from "react";

import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { login } from "../../services/login";
import { useAuth } from "../../context/authContext";

import api from "../../utils/api";

export const Login = () => {
  const { setIsAuth, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginField, setLoginField] = useState({
    username: "vinigrippe",
    password: "anode2012",
  });

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const response = await login({
        username: loginField.username,
        password: loginField.password,
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${response.token}`;
        return config;
      });

      setIsAuth(true);
      setUser(response.user);
      setIsLoading(false);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Email"
            onChange={(e) =>
              setLoginField({ ...loginField, username: e.target.value })
            }
            value={loginField.username}
          />
          <Input
            placeholder="Password"
            onChange={(e) =>
              setLoginField({ ...loginField, password: e.target.value })
            }
            value={loginField.password}
          />
          <Button onClick={handleLogin} isLoading={isLoading}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};
