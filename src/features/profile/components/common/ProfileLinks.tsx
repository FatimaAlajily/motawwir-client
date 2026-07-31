 import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Globe, FileText } from "lucide-react";

import ProfileCard from "./ProfileCard";
import type { Profile } from "../../types/user/Profile";

type Props = {
  profile: Profile;
};

const linkClass =
  "flex items-center gap-2.5 text-xs text-gray-600 hover:text-[#6C5CE7] break-all transition-colors";

export default function ProfileLinks({ profile }: Props) {
  const hasLinks =
    profile.github || profile.linkedin || profile.domain || profile.cv;

  if (!hasLinks) return null;

  return (
    <ProfileCard>
      <h3 className="text-sm font-bold text-gray-900 mb-3.5">الروابط</h3>

      <div className="space-y-2.5">
        {profile.github && (
          <a href={profile.github} target="_blank" rel="noreferrer" className={linkClass}>
            <FaGithub size={15} className="shrink-0 text-gray-400" />
            <span>Github</span>
          </a>
        )}

        {profile.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
            <FaLinkedin size={15} className="shrink-0 text-gray-400" />
            <span>Linkedin</span>
          </a>
        )}

        {profile.domain && (
          <a href={profile.domain} target="_blank" rel="noreferrer" className={linkClass}>
            <Globe size={15} className="shrink-0 text-gray-400" />
            <span>Website</span>
          </a>
        )}

        {profile.cv && (
          <a href={profile.cv} target="_blank" rel="noreferrer" className={linkClass}>
            <FileText size={15} className="shrink-0 text-gray-400" />
            <span>CV</span>
          </a>
        )}
      </div>
    </ProfileCard>
  );
}