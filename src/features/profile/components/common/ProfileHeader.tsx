import { Link } from "react-router-dom";
import { PenLine } from "lucide-react";
import { AvatarComponent } from "../ui/Avatar";
import { RoleBadge } from "../ui/RoleBadge"; // ← استدعاء الشارة
import type { Profile } from "../../types/user/Profile";

export default function ProfileHeader({ profile, isOwner }: { profile: Profile; isOwner: boolean }) {
  return (
    <div className="p-6 md:p-8 flex flex-col md:flex-row items-start justify-between gap-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
        
        <div className="flex flex-col items-center shrink-0">
          <AvatarComponent src={profile.user?.avatar || "/default-avatar.png"} alt={profile.user?.user_name || ""} size="lg" />
          
          {/* عرض السمعة الحقيقية القادمة من بيانات المستخدم */}
          <div className="mt-2 text-xs font-medium flex items-center gap-1.5" style={{ color: "#6B737C" }}>
            <span className="text-sm">Votra</span>
            <span className="font-bold text-xl" style={{ color: "#000000" }}>
              {profile.user?.votra ?? 0}
            </span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-right min-w-0">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            {profile.user?.user_name}
          </h2>

          {/* ← استخدام مكون الشارة الجديد */}
          {profile.user?.role && <RoleBadge role={profile.user.role} />}

          {profile.bio ? (
            <p className="text-xs md:text-sm text-gray-600 mt-3 leading-relaxed">{profile.bio}</p>
          ) : isOwner ? (
            <div className="mt-4 flex items-center justify-center md:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8FF] border border-dashed border-purple-200/80 text-xs text-gray-400">
                <PenLine size={13} className="text-[#6C5CE7]" />
                <span>لا توجد نبذة بعد — أضف نبذة عن نفسك</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {isOwner && (
        <Link to="/Editprofile" className="flex items-center gap-1.5 text-xs font-semibold text-[#6C5CE7] border border-[#6C5CE7]/30 px-4 py-1.5 rounded-full hover:bg-[#F4F2FF] transition-colors self-end md:self-start shrink-0">
          <PenLine size={13} />
          <span>تعديل</span>
        </Link>
      )}
    </div>
  );
}