import LoginForm from "../components/common/LoginForm";
import Brand from "../components/common/Brand";

const LoginPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 p-3 rtl"
      style={{}}
    >
      {/*------------------ Mian Container Card -----------------*/}
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {" "}
        {/*-------------- First Section Brand Component -------------*/}
        <div className="w-full flex justify-center order-2 md:order-2 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-8">
          <Brand />
        </div>
        {/* ---------------Second section Login Form ---------------- */}
        <div className="w-full flex justify-center order-1 md:order-1 ">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
