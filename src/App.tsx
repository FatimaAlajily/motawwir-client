import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import LoadingPage from "./features/auth/pages/LoadingPage";
import ProfilePage from "./features/profile/pages/ProfilePage";
import ProfileEditPage from "./features/profile/pages/ProfileEditPage";
import ErrorBoundary from "./shared/components/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/Editprofile" element={<ProfileEditPage />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;