import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useRegister from "../../hooks/useRegister";
import { InputField } from "../ui/InputField";
import { RadioGroup } from "../ui/RadioGroup";
import { ButtonComponent } from "../ui/Button";
import type { Role } from "../../types/user/Role";
import "../../../../styles/theme.css";

const roleOptions: { value: Role; label: string }[] = [
  { value: "client", label: "عميل" },
  { value: "developer", label: "مطور" },
  { value: "company", label: "شركة" },
];

const RegisterForm = () => {
  const { loading, error, handleRegister } = useRegister();
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<Role>("client");

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const response = await handleRegister({
      user_name: userName,
      email,
      password,
      role,
    });

    if (response.status === "success") {
      navigate("/");
    }
  }

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 sm:gap-4 w-full p-2"
      style={{ fontFamily: '"Tajawal", sans-serif' }}
    >
      <h2
        className="text-3xl sm:text-4xl text-center text-gray-900 tracking-wide mb-1"
        style={{ fontFamily: '"Reem Kufi", sans-serif' }}
      >
        إ نشاء حساب
      </h2>

      <InputField
        label="اسم المستخدم"
        type="text"
        placeholder="ادخل اسم المستخدم"
        value={userName}
        onChange={handleUserName}
      />

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

      <RadioGroup
        label="نوع الحساب"
        value={role}
        onChange={setRole}
        options={roleOptions}
      />

      {error && (
        <p className="text-red-500 text-sm text-center">
          {error}
        </p>
      )}

      <ButtonComponent
        text="إنشاء حساب"
        loading={loading}
      />

      <div className="text-center text-sm text-gray-600 mt-2">
        لديك حساب بالفعل؟{" "}
        <Link
          to="/"
          className="text-purple-700 font-semibold hover:underline"
        >
          تسجيل الدخول
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;