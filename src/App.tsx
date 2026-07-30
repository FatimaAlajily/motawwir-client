import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ProfilePage from "./features/profile/pages/ProfilePage";
import ProfileEditPage from "./features/profile/pages/ProfileEditPage";
// import ErrorBoundary from "./shared/components/ErrorBoundary";
import Dashbord from "./pages/Dashbord";
import useAuthInit from "./features/auth/hooks/useAuthInit";
import PostsPage from "./features/post/pages/PostsPage";
import UsersPage from "./features/users/pages/UsersPage"; // 
import DashboardSkeleton from "./features/post/components/loading/DashboardSkeleton";
const App = () => {
  const { isInit } = useAuthInit();

  if (isInit) {
    return <DashboardSkeleton />;
  }
  return (
    // <ErrorBoundary>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      <Route path="/dashbord" element={<Dashbord />}>
        <Route path="posts/:type" element={<PostsPage />} />
         <Route path="users" element={<UsersPage />} /> 
      </Route>

        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/Editprofile" element={<ProfileEditPage />} />
      
   
    </Routes>
    // {/* </ErrorBoundary> */}
  );
};

export default App;