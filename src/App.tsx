import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import LoadingPage from "./features/auth/pages/LoadingPage";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/loading" element={<LoadingPage />} />
    </Routes>
  );
};

export default App;
