import { useState } from "react";

import { LogoBuilder } from "@/icons/logo/logo";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { login } from "../../services/login";
import { useAuth } from "../../context/authContext";

import api from "../../utils/api";

export const Login = () => {
  const { setIsAuth, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginField, setLoginField] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");

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
      setError("Username or password wrong");
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-white shadow-2xl">
      <div className="w-full max-w-[300px] flex flex-col items-center justify-center">
        <LogoBuilder size="200" />

        <div className="flex flex-col gap-2 mt-10 w-full">
          <Input
            placeholder="Username"
            onChange={(e) =>
              setLoginField({ ...loginField, username: e.target.value })
            }
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            value={loginField.username}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) =>
              setLoginField({ ...loginField, password: e.target.value })
            }
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            value={loginField.password}
          />
          <div className="w-[-webkit-fill-available]">
            <Button type="primary" onClick={handleLogin} isLoading={isLoading}>
              Login
            </Button>
          </div>
          {error && (
            <p className="text-red-400 text-center">
              Username or password wrong
            </p>
          )}
          <Button type="flat" isDisabled>
            Forget Password?
          </Button>
          <p className="border-t mt-2 pt-7 text-slate-500 text-center flex gap-1 justify-center">
            <span className="leading-none">Don't have an account? </span>
            <Button type="link">Register</Button>
          </p>
        </div>
      </div>
    </div>
  );
};
