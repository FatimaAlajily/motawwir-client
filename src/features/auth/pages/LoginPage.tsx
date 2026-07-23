import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { loading, error, handleLogin } = useLogin();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const response = await handleLogin({
      email,
      password,
    });
    if (response.status === "success") {
      navigate("/api/auth/login"); // navigate to dashboard don't forget
    }
  }
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type="email" value={email} onChange={handleEmail} required />
        </div>
        <div>
          <input type="password" value={password} onChange={handlePassword} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "جارٍ الدخول..." : "تسجيل الدخول"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
