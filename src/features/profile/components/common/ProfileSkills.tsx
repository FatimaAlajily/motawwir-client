import ProfileCard from "./ProfileCard";

type Props = {
  skills: string[] | null;
};

export default function ProfileSkills({ skills }: Props) {
  if (!skills || skills.length === 0) return null;

  return (
    <ProfileCard>
      <h3 className="text-sm font-bold text-gray-900 mb-3">محور التقنيات</h3>

      <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs text-gray-600 font-medium">
        {skills.map((skill, index) => (
          <div key={index} className="hover:text-[#6C5CE7] transition-colors cursor-default">
            {skill}
          </div>
        ))}
      </div>
    </ProfileCard>
  );
}