import { useEffect, useState } from "react";
import { getUsersRequest } from "../api/UserApi";
import type { User } from "../types/common/User";
import type { UserType } from "../types/common/UserType";
import type { UserPagination } from "../types/forms/UserPagination";

const useFetchUsers = (
  role: UserType | "all",
  page: number,
  search: string
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<UserPagination<User>["meta"] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    async function fetchUsers() {
      setLoading(true);
      setError("");

      const response = await getUsersRequest({
        role: role === "all" ? undefined : role,
        page,
        search,
      });

      if (!isMounted) return;

      if ("status" in response && response.status === "error") {
        setError(response.message);
        setUsers([]);
        setMeta(null);
      } else {
        const success = response as UserPagination<User>;
        setUsers(success.data);
        setMeta(success.meta);
      }

      setLoading(false);
    }

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [role, page, search]);

  return { users, setUsers, meta, loading, error };
};

export default useFetchUsers;