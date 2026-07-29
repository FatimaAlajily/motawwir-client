import Brand from "../components/common/Brand";
import RegisterForm from "../components/common/RegisterForm";

const RegisterPage = () => {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center bg-gray-100 p-3"
    >
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* نموذج التسجيل (يظهر أولاً في الموبايل، وفي اليمين للشاشات الكبيرة) */}
        <div className="w-full flex justify-center order-1 md:order-1">
          <RegisterForm />
        </div>

        {/* الأيقونة والـ Brand (تظهر في الأسفل في الموبايل، وفي اليسار للشاشات الكبيرة) */}
        <div className="w-full flex justify-center order-2 md:order-2 border-t md:border-t-0 md:border-r border-gray-100 pt-6 md:pt-0 md:pr-8">
          <Brand />
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;