import {
  Globe,
  FileText,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import type { Profile } from "../../types/user/Profile";
import { InfoRow } from "../ui/InfoRow";
import { SidebarSection } from "../ui/SidebarSection";

type ProfileUI = Profile & {
  postsCount?: number;
  commentsCount?: number;
};

/* ── أيقونات SVG ── */

const GithubIcon = ({ size = 15, className = "" }: { size?: number; className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ size = 15, className = "" }: { size?: number; className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

/* ── بناء الروابط ── */

const buildSocialLinks = (profile: Profile) => [
  ...(profile.github ? [{ id: "github", platform: "github" as const, label: "GitHub", url: profile.github }] : []),
  ...(profile.linkedin ? [{ id: "linkedin", platform: "linkedin" as const, label: "LinkedIn", url: profile.linkedin }] : []),
  ...(profile.domain ? [{ id: "website", platform: "website" as const, label: "Website", url: profile.domain }] : []),
  ...(profile.cv ? [{ id: "cv", platform: "cv" as const, label: "CV", url: profile.cv }] : []),
];

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case "github": return <GithubIcon size={15} />;
    case "linkedin": return <LinkedinIcon size={15} />;
    case "website": return <Globe size={15} />;
    case "cv": return <FileText size={15} />;
    default: return <Globe size={15} />;
  }
};

/* ══════════════════════════════════════
   الإحصائيات
   ══════════════════════════════════════ */

export function ProfileStats({ profile }: { profile: ProfileUI }) {
  return (
    <div className="p-5 flex items-center justify-around text-center">
      <div className="flex-1">
        <div className="font-extrabold text-gray-900 text-lg">
          {profile.postsCount ?? 0}
        </div>
        <div className="text-[11px] text-gray-400 font-medium mt-0.5">منشورات</div>
      </div>
      <div className="h-8 w-[1px] bg-gray-100" />
      <div className="flex-1">
        <div className="font-extrabold text-gray-900 text-lg">
          {profile.commentsCount ?? 0}
        </div>
        <div className="text-[11px] text-gray-400 font-medium mt-0.5">تعليقات</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   الروابط
   ══════════════════════════════════════ */

export function ProfileLinks({ profile, isOwner }: { profile: Profile; isOwner: boolean }) {
  const links = buildSocialLinks(profile);

  if (links.length === 0 && !isOwner) return null;

  return (
    <SidebarSection title="الروابط">
      {links.length > 0 ? (
        <div className="space-y-2.5">
          {links.map((link) => (
            <InfoRow
              key={link.id}
              icon={getSocialIcon(link.platform)}
              text={link.label}
              href={link.url}
              truncate
            />
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-gray-400 py-1">لم تُضف روابط بعد</p>
      )}
    </SidebarSection>
  );
}

/* ══════════════════════════════════════
   معلومات التواصل
   ══════════════════════════════════════ */

export function ProfileContact({ profile, isOwner }: { profile: Profile; isOwner: boolean }) {
  const hasAny = profile.gmail || profile.phone || profile.location;

  if (!hasAny && !isOwner) return null;

  return (
    <SidebarSection title="معلومات التواصل">
      {hasAny ? (
        <div className="space-y-2.5">
          {profile.gmail && (
            <InfoRow icon={<Mail size={15} />} text={profile.gmail} truncate />
          )}
          {profile.phone && (
            <InfoRow icon={<Phone size={15} />} text={profile.phone} />
          )}
          {profile.location && (
            <InfoRow icon={<MapPin size={15} />} text={profile.location} />
          )}
        </div>
      ) : (
        <p className="text-[11px] text-gray-400 py-1">لم تُضف معلومات تواصل بعد</p>
      )}
    </SidebarSection>
  );
}

/* ══════════════════════════════════════
   المهارات
   ══════════════════════════════════════ */

export function ProfileSkills({ skills, isOwner }: { skills: string[]; isOwner: boolean }) {
  const hasAny = skills && skills.length > 0;

  if (!hasAny && !isOwner) return null;

  return (
    <SidebarSection title="محور التقنيات">
      {hasAny ? (
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-gray-600 font-medium">
          {skills.map((skill, i) => (
            <div key={i} className="hover:text-[#6C5CE7] transition-colors cursor-default">
              {skill}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-gray-400 py-1">لم تُضف مهارات بعد</p>
      )}
    </SidebarSection>
  );
}