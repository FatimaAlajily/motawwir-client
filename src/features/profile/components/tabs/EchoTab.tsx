import CommentSection from "../../../comment/components/common/CommentSection";

type Props = {
  profileUserId: number;
  currentUserId?: number;
};

// جدار الصدى = تعليقات من نوع "profile" على صاحب هذا البروفايل
export default function EchoTab({ profileUserId, currentUserId }: Props) {
  return (
    <div className="p-6">
      <CommentSection
        target={{ type: "profile", profile_user_id: profileUserId }}
        currentUserId={currentUserId}
      />
    </div>
  );
}