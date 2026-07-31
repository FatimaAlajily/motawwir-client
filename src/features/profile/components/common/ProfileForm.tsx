import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Globe,
  Mail,
  Phone,
  MapPin,
  Plus,
  Check,
  ArrowRight,
} from "lucide-react";
import type { Profile, UpdateProfilePayload } from "../../types/user/Profile";

import { PurpleInput } from "../ui/PurpleInput";
import { SkillItemComponent } from "../ui/SkillItemComponent";
import { AvatarComponent } from "../ui/Avatar";
import { TextAreaField } from "../ui/TextAreaField";
import { FileField } from "../ui/FileField";

/* ── أيقونات SVG ── */
const GithubIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

/* ── Types ── */
type Props = {
  profile: Profile;
  loading: boolean;
  error: string;
  success: string;
  handleUpdate: (payload: UpdateProfilePayload) => Promise<{ status: string; message: string; data?: Profile }>;
};

export default function ProfileForm({ profile, loading, error, success, handleUpdate }: Props) {
  const navigate = useNavigate();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [userName, setUserName] = useState(profile.user?.user_name ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [domain, setDomain] = useState(profile.domain ?? "");
  const [github, setGithub] = useState(profile.github ? profile.github.replace("https://github.com/", "") : "");
  const [linkedin, setLinkedin] = useState(profile.linkedin ? profile.linkedin.replace("https://linkedin.com/in/", "") : "");
  const [gmail, setGmail] = useState(profile.gmail ?? "");
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [location, setLocation] = useState(profile.location ?? "");

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(profile.user?.avatar ?? "");
  const [cv, setCv] = useState<File | null>(null);

  const [skills, setSkills] = useState<string[]>(profile.skill ?? []);
  const [newSkill, setNewSkill] = useState("");
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

    const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await handleUpdate({
      user_name: userName || undefined,
      bio, phone, location, skill: skills,
      github: github ? `https://github.com/${github}` : undefined,
      gmail,
      domain: domain.startsWith("http") ? domain : `https://${domain}`,
      linkedin: linkedin ? `https://linkedin.com/in/${linkedin}` : undefined,
      avatar, cv,
    });

    if (res.status === "success") {
      navigate("/profile");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F3F8] py-8 px-4 sm:px-6 lg:px-8 text-gray-900" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-purple-100/80 rounded-3xl shadow-sm overflow-hidden">
          
          {/* Header */}
          <div className="p-6 border-b border-purple-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => navigate("/profile")} className="w-10 h-10 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6C5CE7] flex items-center justify-center transition-colors">
                <ArrowRight size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">تعديل البروفايل</h1>
              </div>
            </div>
                        <div className="flex items-center gap-3">
              <button type="button" onClick={() => navigate("/profile")} className="px-7 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 text-sm font-bold transition-colors">إلغاء</button>
              <button type="submit" form="profile-form" disabled={loading} className="px-8 py-3 rounded-xl bg-[#6C5CE7] hover:bg-[#5A4AD1] disabled:opacity-70 text-white text-sm font-bold shadow-md shadow-purple-200 transition-all">
                <span>{loading ? "جاري الحفظ..." : "حفظ التغييرات"}</span>
              </button>
            </div>
          </div>

          {/* Form Body */}
          <form id="profile-form" onSubmit={onSubmit} className="p-6 md:p-8 space-y-8">
            
                       {/* Avatar & Name */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative shrink-0">
                <AvatarComponent
                  src={avatarPreview || "/default-avatar.png"}
                  alt={userName}
                  size="lg"
                />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#6C5CE7] hover:bg-[#5A4AD1] text-white flex items-center justify-center shadow-lg border-2 border-white transition-transform hover:scale-105"
                >
                  <Camera size={18} />
                </button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-sm font-bold text-gray-900 mb-2 text-right">
                  الاسم بالكامل
                </label>
                <PurpleInput
                  value={userName}
                  onChange={setUserName}
                  placeholder="أدخل الاسم الكامل"
                />
              </div>
            </div>

            {/* Bio */}
            <TextAreaField
              label="النبذة التعريفية"
              placeholder="اكتب نبذة تعريفية مختصرة عنك..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />

            {/* Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 text-right">
                الروابط
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PurpleInput icon={<GithubIcon size={16} className="text-[#6C5CE7]" />} value={github} onChange={setGithub} placeholder="github_username" ltr />
                <PurpleInput icon={<LinkedinIcon size={16} className="text-[#6C5CE7]" />} value={linkedin} onChange={setLinkedin} placeholder="linkedin_username" ltr />
                <PurpleInput icon={<Globe size={16} className="text-[#6C5CE7]" />} value={domain} onChange={setDomain} placeholder="yourdomain.com" ltr />
              </div>

              {/* CV */}
              <FileField
                label="السيرة الذاتية (CV)"
                accept=".pdf,.doc,.docx"
                onChange={(file) => setCv(file)}
                currentFileName={profile.cv}
              />
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 text-right">
                معلومات التواصل
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PurpleInput icon={<Mail size={16} className="text-[#6C5CE7]" />} value={gmail} onChange={setGmail} placeholder="example@gmail.com" ltr />
                <PurpleInput icon={<Phone size={16} className="text-[#6C5CE7]" />} value={phone} onChange={setPhone} placeholder="091xxxxxxxx" ltr />
                <PurpleInput icon={<MapPin size={16} className="text-[#6C5CE7]" />} value={location} onChange={setLocation} placeholder="العنوان أو المدينة" className="sm:col-span-2" />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-900 text-right">
                التقنيات والمهارات
              </h3>
              <div className="bg-[#FAF8FF] border border-purple-200 p-5 rounded-2xl flex flex-wrap items-center gap-2.5">
                {skills.map((s, idx) => (
                  <SkillItemComponent key={idx} name={s} onRemove={() => setSkills(skills.filter((skill) => skill !== s))} />
                ))}
                {isAddingSkill ? (
                  <div className="flex items-center gap-1.5 bg-white border border-purple-300 rounded-xl px-3 py-1.5">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); if(newSkill.trim()) { setSkills([...skills, newSkill.trim()]); setNewSkill(""); setIsAddingSkill(false); } } }}
                      autoFocus
                      className="text-xs font-medium text-gray-800 outline-none w-28 bg-transparent"
                      placeholder="اسم المهارة"
                    />
                    <button type="button" onClick={() => { if(newSkill.trim()) { setSkills([...skills, newSkill.trim()]); setNewSkill(""); setIsAddingSkill(false); } }} className="text-[#6C5CE7] hover:text-purple-800 p-0.5">
                      <Check size={16} />
                    </button>
                  </div>
                                 ) : (
                  <button type="button" onClick={() => setIsAddingSkill(true)} className="bg-white hover:bg-purple-50 text-[#6C5CE7] border border-purple-300 hover:border-[#6C5CE7] text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all">
                    <Plus size={15} />
                    <span> إضافة مهارة</span>
                  </button>
                )}
              </div>
            </div>

            {error && <div className="bg-red-50 text-red-600 text-sm font-medium p-3 rounded-xl text-center">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 text-sm font-medium p-3 rounded-xl text-center">{success}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}