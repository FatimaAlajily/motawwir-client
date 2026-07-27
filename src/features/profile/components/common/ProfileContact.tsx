import { Mail, Phone, MapPin } from "lucide-react";

import ProfileCard from "./ProfileCard";
import type { Profile } from "../../types/user/Profile";

type Props = {
  profile: Profile;
};

export default function ProfileContact({ profile }: Props) {
  return (
    <ProfileCard>
      <h3 className="text-sm font-bold text-gray-900 mb-3.5">
        معلومات التواصل
      </h3>

      <div className="space-y-2.5 text-xs">
        {profile.gmail && (
          <div className="flex items-center gap-2.5 text-gray-600">
            <Mail size={15} className="shrink-0 text-gray-400" />
            <span className="truncate">{profile.gmail}</span>
          </div>
        )}

        {profile.phone && (
          <div className="flex items-center gap-2.5 text-gray-600">
            <Phone size={15} className="shrink-0 text-gray-400" />
            <span>{profile.phone}</span>
          </div>
        )}

        {profile.location && (
          <div className="flex items-center gap-2.5 text-gray-600">
            <MapPin size={15} className="shrink-0 text-gray-400" />
            <span>{profile.location}</span>
          </div>
        )}
      </div>
    </ProfileCard>
  );
}