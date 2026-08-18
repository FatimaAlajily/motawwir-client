import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchPosts from "../hooks/useFetchPosts";
import PostCard from "../components/cards/PostCard";
import type { Post } from "../types/common/Post";
import EditPostModal from "../components/ui/EditPostModal";
import CreatePostModal from "../components/models/CreatePostModal";
import SkeletonCard from "../components/loading/SkeletonCard";
import { usePostSearchStore } from "../../../shared/store/usePostSearchStore";
import {
  MessageCircle,
  UserPlus,
  ChevronLeft,
  HelpCircle,
  FolderKanban,
  Briefcase,
  Users,
  Globe,
} from "lucide-react";
import { useAuthStore } from "../../auth/store/useAuthStore";
import useFetchUsers from "../../users/hooks/useFetchUsers";

type SectionProps = {
  title: string;
  type: string;
  icon: React.ReactNode;
  posts: Post[];
  loading: boolean;
  onDeleted: (id: number) => void;
  onEdit: (post: Post) => void;
  navigate: (path: string) => void;
};

const PostSection = ({
  title,
  type,
  icon,
  posts,
  loading,
  onDeleted,
  onEdit,
  navigate,
}: SectionProps) => {
  if (!loading && posts.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
          {icon}
          {title}
        </h2>
        <button
          onClick={() => navigate(`/dashbord/posts/${type}`)}
          className="text-xs text-[#6620F3] font-bold flex items-center gap-1 hover:underline"
        >
          عرض الكل
          <ChevronLeft size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDeleted={() => onDeleted(post.id)}
                onEdit={onEdit}
              />
            ))}
      </div>
    </section>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);
  const query = usePostSearchStore((state) => state.query);

  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // ✅ حالة فتح نافذة إنشاء المنشور

  const { users, loading: usersLoading } = useFetchUsers("all", 1, "");
  const suggestedUsers = users.slice(0, 8);

  const {
    posts: questionPosts,
    setPosts: setQuestionPosts,
    loading: loadingQ,
  } = useFetchPosts("question", 1, query);
  const {
    posts: workPosts,
    setPosts: setWorkPosts,
    loading: loadingW,
  } = useFetchPosts("work", 1, query);
  const {
    posts: newPosts,
    setPosts: setNewPosts,
    loading: loadingN,
  } = useFetchPosts("new", 1, query);

  const { posts: projectPosts, loading: loadingP } = useFetchPosts(
    "project",
    1,
    ""
  );
  const { posts: teamPosts, loading: loadingT } = useFetchPosts("team", 1, query);

  // دالة للتحقق من تسجيل الدخول قبل فتح النافذة أو توجيه المستخدم
  const handleOpenCreateModal = () => {
    if (!currentUser) {
      navigate("/");
    } else {
      setIsCreateModalOpen(true);
    }
  };

  function handlePostDeleted(deletedId: number, type: string) {
    const setters: Record<
      string,
      React.Dispatch<React.SetStateAction<Post[]>>
    > = {
      question: setQuestionPosts,
      work: setWorkPosts,
      new: setNewPosts,
    };
    const setter = setters[type];
    if (setter) {
      setter((prev) => prev.filter((p) => p.id !== deletedId));
    }
  }

  function handlePostUpdated(updatedPost: Post) {
    const setters: Record<
      string,
      React.Dispatch<React.SetStateAction<Post[]>>
    > = {
      question: setQuestionPosts,
      work: setWorkPosts,
      new: setNewPosts,
    };
    const setter = setters[updatedPost.type];
    if (setter) {
      setter((prev) =>
        prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );
    }
    setEditingPost(null);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full">
      {/* ========== العمود الأوسط: الأقسام ========== */}
      <main className="flex-1 w-full order-2 lg:order-1">
        {/* صندوق الإنشاء السريع (يظهر للمستخدمين المسجلين فقط) */}
        {currentUser && (
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 mb-8">
            <img
              src={currentUser?.avatar || "https://via.placeholder.com/40"}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#F4F0FF]"
              alt="me"
            />
            <input
              type="text"
              placeholder="شارك فكرتك، سؤالك ..."
              className="bg-violet-100 flex-1 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#dfd2f14a] cursor-pointer"
              readOnly
              onClick={handleOpenCreateModal} // ✅ فتح النافذة المنبثقة عند النقر
            />
          </div>
        )}

        <PostSection
          title="أحدث الأسئلة"
          type="question"
          icon={<HelpCircle size={20} className="text-[#6620F3]" />}
          posts={questionPosts.slice(0, 2)}
          loading={loadingQ}
          onDeleted={(id) => handlePostDeleted(id, "question")}
          onEdit={setEditingPost}
          navigate={navigate}
        />

        <PostSection
          title="أحدث فرص العمل"
          type="work"
          icon={<Briefcase size={20} className="text-[#6620F3]" />}
          posts={workPosts.slice(0, 5)}
          loading={loadingW}
          onDeleted={(id) => handlePostDeleted(id, "work")}
          onEdit={setEditingPost}
          navigate={navigate}
        />

        <PostSection
          title="أحدث الأخبار"
          type="new"
          icon={<Globe size={20} className="text-[#6620F3]" />}
          posts={newPosts.slice(0, 2)}
          loading={loadingN}
          onDeleted={(id) => handlePostDeleted(id, "new")}
          onEdit={setEditingPost}
          navigate={navigate}
        />
      </main>

      {/* ========== العمود الأيسر: الكروت الجانبية ========== */}
      <aside className="w-full lg:w-80 flex flex-col gap-6 shrink-0 order-1 lg:order-2">
        {/* كارد الترحيب */}
        <div className="bg-linear-to-l from-[#4b1e8a] to-[#8e52dc] p-5 rounded-2xl text-white shadow-md">
          <h3 className="font-bold text-lg mb-1">
            مرحبا يا {currentUser?.user_name?.split(" ")[0] || "مطوّر"}
          </h3>
          <p className="text-sm text-white/80 mb-4">
            شارك معرفتك مع مجتمع مطور واكسب نقاط السمعة
          </p>
          <button
            onClick={handleOpenCreateModal} // ✅ فتح النافذة المنبثقة عند النقر على الزر أيضاً
            className="bg-white text-[#6620F3] text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            انشر منشورك الان
          </button>
        </div>

        {/* كارد الدردشة المباشرة */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-gray-800">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            الدردشة العالمية
          </h4>
          <p className="text-xs text-gray-500 mb-3">
            ستجد جميع المستخدمين داخل هذه الدردشة للأستفسار أو التعرف على
            مستخدمين من ليبيا
          </p>
          <button
            onClick={() => navigate("/dashbord/chat")}
            className="w-full text-[#6620F3] text-xs font-bold mt-2 flex items-center justify-center gap-1 bg-[#F4F0FF] py-2 rounded-full hover:bg-[#E5DEFF] transition-colors"
          >
            <MessageCircle size={14} />
            انتقل إلى الدردشة
          </button>
        </div>

        {/* كارد أحدث المشاريع */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-sm flex items-center gap-2 text-gray-800">
              <FolderKanban size={16} className="text-[#6620F3]" />
              أحدث المشاريع
            </h4>
            <button
              onClick={() => navigate("/dashbord/posts/project")}
              className="text-[10px] text-[#6620F3] font-bold hover:underline"
            >
              عرض الكل
            </button>
          </div>
          <div className="space-y-3">
            {loadingP ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))
            ) : projectPosts.length > 0 ? (
              projectPosts.slice(0, 4).map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors"
                  onClick={() => navigate("/dashbord/posts/project")}
                >
                  <div className="w-8 h-8 rounded-full bg-[#F4F0FF] flex items-center justify-center shrink-0">
                    <FolderKanban size={14} className="text-[#6620F3]" />
                  </div>
                  <h5 className="text-xs font-medium text-gray-700 line-clamp-1">
                    {post.title}
                  </h5>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-2">
                لا توجد مشاريع حالياً
              </p>
            )}
          </div>
        </div>

        {/* كارد أحدث الفرق */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-sm flex items-center gap-2 text-gray-800">
              <Users size={16} className="text-[#6620F3]" />
              أحدث طلبات الفرق
            </h4>
            <button
              onClick={() => navigate("/dashbord/posts/team")}
              className="text-[10px] text-[#6620F3] font-bold hover:underline"
            >
              عرض الكل
            </button>
          </div>
          <div className="space-y-3">
            {loadingT ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))
            ) : teamPosts.length > 0 ? (
              teamPosts.slice(0, 4).map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors"
                  onClick={() => navigate("/dashbord/posts/team")}
                >
                  <div className="w-8 h-8 rounded-full bg-[#F4F0FF] flex items-center justify-center shrink-0">
                    <Users size={14} className="text-[#6620F3]" />
                  </div>
                  <h5 className="text-xs font-medium text-gray-700 line-clamp-1">
                    {post.title}
                  </h5>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-2">
                لا توجد طلبات فرق حالياً
              </p>
            )}
          </div>
        </div>

        {/* كارد المستخدمين */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-sm flex items-center gap-2 text-gray-800">
              <UserPlus size={16} className="text-[#6620F3]" />
              ابرز المستخدمين
            </h4>
            <button
              onClick={() => navigate("/dashbord/users")}
              className="text-[10px] text-[#6620F3] font-bold hover:underline"
            >
              عرض الكل
            </button>
          </div>

          {usersLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {suggestedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate(`/profile/${user.id}`)}
                  >
                    <img
                      src={user.avatar || "https://via.placeholder.com/40"}
                      className="w-8 h-8 rounded-full object-cover"
                      alt={user.user_name}
                    />
                    <div>
                      <h5 className="text-xs font-bold text-gray-800">
                        {user.user_name}
                      </h5>
                      <span className="text-[10px] text-gray-400">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/profile/${user.id}`)}
                    className="text-[10px] bg-[#6620F3] text-white font-bold px-3 py-1 rounded-full hover:bg-[#5a1cd8] transition-colors"
                  >
                    زيارة
                  </button>
                </div>
              ))}
              {suggestedUsers.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-4">
                  لا يوجد مستخدمون لعرضهم حالياً
                </p>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* نافذة تعديل المنشور */}
      <EditPostModal
        post={editingPost}
        onClose={() => setEditingPost(null)}
        onUpdated={handlePostUpdated}
      />

      {/* ✅ نافذة اختيار نوع المنشور (CreatePostModal) */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;