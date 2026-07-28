import { useState } from "react";
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

export default function ProfileView() {
  const { profile, fetching, error } = useProfile();
  const [activeTab, setActiveTab] = useState<TabType>("echo");
  const isOwner = true;

  // آيدي المستخدم المسجّل دخوله حالياً، من نفس الستور اللي يستخدمه useLogin
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

  return (
    <div
      className="min-h-screen bg-[#F4F6FC] px-4 sm:px-6 font-sans flex flex-col"
      dir="rtl"
    >
      <div className="w-full pt-8 md:pt-10 flex-1 flex flex-col">

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-gray-100 flex-1">

            <div className="lg:col-span-3 divide-y divide-gray-100 flex flex-col">
              <ProfileHeader profile={uiProfile} isOwner={isOwner} />
              
              <div className="flex-1 flex flex-col divide-y divide-gray-100">
                <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                
                <div className="flex-1">
                  {/* ← عرض المكون المناسب بناءً على التاب */}
                  {activeTab === "echo" && uiProfile.user && (
                    <EchoTab
                      profileUserId={uiProfile.user.id}
                      currentUserId={currentUserId}
                    />
                  )}
                  {activeTab === "nexus" && <NexusTab />}
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