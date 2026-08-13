import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import { useAuthStore } from "../../../auth/store/useAuthStore";
import type { Profile } from "../../types/user/Profile";
import type { TabType } from "./ProfileTabs";

import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import {
  ProfileStats,
  ProfileLinks,
  ProfileContact,
  ProfileSkills,
} from "./ProfileSidebar";

// استدعاء ملفات التبويبات المنفصلة
import EchoTab from "../tabs/EchoTab";
import NexusTab from "../tabs/NexusTab";
import VaultTab from "../tabs/VaultTab";

type ProfileUI = Profile & {
  votraScore?: string;
  postsCount?: number;
  commentsCount?: number;
};

type Props = {
  userId?: string;
};

export default function ProfileView({ userId }: Props) {
  const { profile, fetching, error } = useProfile(userId);
  const [activeTab, setActiveTab] = useState<TabType>("echo");
  const navigate = useNavigate();

  const currentUserId = useAuthStore((state) => state.user?.id);

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-3 border-purple-200 border-t-[#6C5CE7] rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-20">{error}</p>;
  }

  if (!profile) {
    return <p className="text-center text-gray-500 py-20">لا توجد بيانات بروفايل بعد</p>;
  }

  const uiProfile: ProfileUI = {
    ...profile,
    votraScore: "0",
    postsCount: 0,
    commentsCount: 0,
  };

  const isOwner = !userId || uiProfile.user?.id === currentUserId;

  return (
    <div
      className="min-h-screen bg-[#F4F6FC] px-4 sm:px-6 font-sans flex flex-col relative items-center justify-center"
      dir="rtl"
    >
      {/* زر السهم على اليمين في المنتصف تماماً وخارج صندوق البروفايل */}
      <button
        onClick={() => navigate("/dashbord")}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 bg-white hover:bg-gray-50 text-gray-700 p-3.5 rounded-full shadow-lg border border-gray-200 transition-all flex items-center justify-center group"
        title="الرجوع إلى الرئيسية"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 transform group-hover:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="w-full max-w-7xl pt-8 md:pt-10 flex-1 flex flex-col">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-gray-100 flex-1">

            <div className="lg:col-span-3 divide-y divide-gray-100 flex flex-col">
              <ProfileHeader profile={uiProfile} isOwner={isOwner} />
              
              <div className="flex-1 flex flex-col divide-y divide-gray-100">
                <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                
                <div className="flex-1">
                  {activeTab === "echo" && uiProfile.user && (
                    <EchoTab
                      profileUserId={uiProfile.user.id}
                      currentUserId={currentUserId}
                    />
                  )}
                  {activeTab === "nexus" && uiProfile.user && (
                    <NexusTab profileUserId={uiProfile.user.id} />
                  )}
                  {activeTab === "vault" && <VaultTab />}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 text-right space-y-1">
              <ProfileStats profile={uiProfile} />
              <ProfileLinks profile={uiProfile} isOwner={isOwner} />
              <ProfileContact profile={uiProfile} isOwner={isOwner} />
              <ProfileSkills skills={uiProfile.skill ?? []} isOwner={isOwner} />
            </div>

          </div>
        </div>

        <footer className="text-center text-xs text-gray-400 font-medium py-4">
          Motaweer Community &bull; Developer Profile Card
        </footer>

      </div>
    </div>
  );
}