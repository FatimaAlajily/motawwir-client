import { useState } from "react";
import type { UserType } from "../types/common/UserType";
import useFetchUsers from "../hooks/useFetchUsers";
import UserTypeFilter from "../components/ui/UserTypeFilter";
import UserSearchInput from "../components/ui/UserSearchInput";
import UserCard from "../components/cards/UserCard";
import UserCardSkeleton from "../components/loading/UserCardSkeleton";
import Pagination from "../../post/components/inputs/Pagination";
import { useUserSearchStore } from "../store/useUserSearchStore";
import useDebouncedValue from "../../../shared/hooks/useDebouncedValue";
import NO_RESULTS_IMAGE from "../../../assets/images/noresultfound.png";

const UsersPage = () => {
  const [role, setRole] = useState<UserType | "all">("all");
  const [page, setPage] = useState(1);

  const rawSearchQuery = useUserSearchStore((state) => state.query);
  const searchQuery = useDebouncedValue(rawSearchQuery, 400);

  const { users, meta, loading, error } = useFetchUsers(
    role,
    page,
    searchQuery
  );

  function handleRoleChange(newRole: UserType | "all") {
    setRole(newRole);
    setPage(1);
  }

  if (error) {
    return (
      <p className="text-centeUsersPage.tsxr text-red-500 py-10">{error}</p>
    );
  }

  return (
    <>
      <UserSearchInput />
      <UserTypeFilter value={role} onChange={handleRoleChange} />

      {!loading && users.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center h-full py-20"
          style={{ fontFamily: "'Tajawal', sans-serif" }}
        >
          <img
            src={NO_RESULTS_IMAGE}
            alt="لا توجد نتائج"
            className="w-48 h-48 object-contain mb-4"
          />
          <p className="text-gray-500 font-semibold text-sm">
            لم يتم إيجاد مستخدمين مطابقين
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          style={{ fontFamily: "'Tajawal', sans-serif" }}
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <UserCardSkeleton key={i} />
              ))
            : users.map((user) => <UserCard key={user.id} user={user} />)}
        </div>
      )}

      {!loading && meta && <Pagination meta={meta} onPageChange={setPage} />}
    </>
  );
};

export default UsersPage;
