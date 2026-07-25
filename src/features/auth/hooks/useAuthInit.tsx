import { useEffect, useState } from "react";
import { userRequest } from "../api/AuthApi";
import { useAuthStore } from "../store/useAuthStore";

const useAuthInit = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const [isInit, setIsInit] = useState<boolean>(
    () => !!localStorage.getItem("token")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    let cancelled = false;

    userRequest().then((response) => {
      if (cancelled) return;

      if (response.status === "success") {
        setUser(response.data);
      } else {
        localStorage.removeItem("token");
      }
      setIsInit(false);
    });

    return () => {
      cancelled = true;
    };
  }, [setUser]);
  return { isInit };
};

export default useAuthInit;
