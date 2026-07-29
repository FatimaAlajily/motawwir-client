import { useEffect, useState } from "react";
import { getProfileRequest, updateProfileRequest } from "../api/ProfileApi";
import type { Profile, UpdateProfilePayload } from "../types/user/Profile";

const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fetching, setFetching] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    (async () => {
      setFetching(true);
      setError("");

      const response = await getProfileRequest();

      if (response.status === "success") {
        setProfile(response.data);
      } else {
        setError(response.message);
      }

      setFetching(false);
    })();
  }, []);

  async function handleUpdate(payload: UpdateProfilePayload) {
    setLoading(true);
    setError("");
    setSuccess("");

    const response = await updateProfileRequest(payload);

    if (response.status === "success") {
      setProfile(response.data);
      setSuccess(response.message);
    } else {
      setError(response.message);
    }

    setLoading(false);
    return response;
  }

  return {
    profile,
    fetching,
    loading,
    error,
    success,
    handleUpdate,
  };
};

export default useProfile;