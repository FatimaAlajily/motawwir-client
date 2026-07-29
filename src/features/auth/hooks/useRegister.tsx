import { useState } from "react";
import type { Register } from "../types/user/Register";
import { registerRequest } from "../api/AuthApi";

const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleRegister(payload: Register) {
    setLoading(true);
    setError("");
    const response = await registerRequest(payload);
    if (response.status !== "success") {
      setError(response.message);
    }
    setLoading(false);
    return response;
  }

  return {
    loading,
    error,
    handleRegister,
  };
};

export default useRegister;