import useProfile from "../hooks/useProfile";
import ProfileForm from "../components/common/ProfileForm";

const ProfileEditPage = () => {
  const {
    profile,
    fetching,
    loading,
    error,
    success,
    handleUpdate,
  } = useProfile();

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F3F8]">
        <div className="w-8 h-8 border-3 border-purple-200 border-t-[#6C5CE7] rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F3F8]">
        <p className="text-gray-500">لا توجد بيانات بروفايل</p>
      </div>
    );
  }

  return <ProfileForm profile={profile} loading={loading} error={error} success={success} handleUpdate={handleUpdate} />;
};

export default ProfileEditPage;