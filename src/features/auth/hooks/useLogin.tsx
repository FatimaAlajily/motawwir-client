import { useState } from "react";
import type { User } from "../types/user/User";
import type { Login } from "../types/user/Login";
import { loginRequest } from "../api/AuthApi";

const useLogin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleLogin(payload: Login) {
    setLoading(true);
    setError("");

    const response = await loginRequest(payload);
    if (response.status === "success") {
      localStorage.setItem("token", response.token!);
      setUser(response.data);
    } else {
      setError(response.message);
    }
    setLoading(false);
    return response;
  }
  return {
    user,
    loading,
    error,
    handleLogin,
  };
};

export default useLogin;
