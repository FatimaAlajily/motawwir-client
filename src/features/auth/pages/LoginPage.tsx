import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const { user, loading, error, handleLogin } = useLogin();

  async function onSubmit() {
    await handleLogin({
      email: "asmaa@gmail.com",
      password: "1234",
    });
  }
  return (
    <div>
      <button onClick={onSubmit}>Login</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {user && <p>Welcome {user.user_name}</p>}
    </div>
  );
};

export default LoginPage;
