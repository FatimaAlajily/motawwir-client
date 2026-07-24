import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { InputField } from "../ui/InputField";
import { ButtonComponent } from "../ui/Button";
import "../../../../styles/theme.css";

const LoginForm = () => {
  const { loading, error, handleLogin } = useLogin();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // --------------- Design Attempt -----------------
  const [attempts, setAttempts] = useState<number>(0);
  const [lockout, setLockout] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const isLocked = lockout > 0;

  // -------------- Count Affect --------------------

  useEffect(() => {
    if (lockout > 0) {
      const interval = setInterval(() => {
        const remaining = Math.ceil((lockout - Date.now()) / 1000);
        if (remaining <= 0) {
          setLockout(0);
          setTime(0);
          setAttempts(0);
          clearInterval(interval);
        } else {
          setTime(remaining);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockout]);

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log("Sending data:", { email, password }); // remove later NOTE

    if (lockout > 0) return;

    const response = await handleLogin({
      email,
      password,
    });
    if (response.status === "success") {
      setAttempts(0);
      navigate("/api/auth/login"); // navigate to dashboard don't forget
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        const lockoutTime = Date.now() + 60 * 1000; // دقيقة واحدة
        setLockout(lockoutTime);
        setTime(60);
      }
    }
  }
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-3 sm:gap-4 w-full p-2 ${
        isShaking ? "animate-shake" : ""
      }`}
      style={{ fontFamily: '"Tajawal", sans-serif' }}
    >
      <h2
        className="text-3xl sm:text-4xl text-center text-gray-900 tracking-wide mb-1"
        style={{ fontFamily: '"Reem Kufi", sans-serif' }}
      >
        مطور
      </h2>

      <InputField
        label="البريد الألكتروني"
        type="email"
        placeholder="ادخل البريد الألكتروني"
        value={email}
        onChange={handleEmail}
      />

      <InputField
        label="كلمة المرور"
        type="password"
        placeholder="ادخل كلمة المرور"
        value={password}
        onChange={handlePassword}
      />

      {error && !isLocked && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      {isLocked && (
        <p className="text-red-600 text-sm text-center font-bold">
          تم تجاوز عدد المحاولات الخاطئة. يجب الانتظار {time} ثانية
        </p>
      )}
      <ButtonComponent
        text={isLocked ? `انتظر (${time}ث)` : "تسجيل الدخول"}
        loading={loading || isLocked}
      />
      <div className="text-center text-sm text-gray-600 mt-2">
        ليس لديك حساب ؟{" "}
        <Link
          to="/register"
          className="text-purple-700 font-semibold hover:underline"
        >
          إنشاء حساب
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
