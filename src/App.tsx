import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import Dashbord from "./pages/Dashbord";
import useAuthInit from "./features/auth/hooks/useAuthInit";
import PostsPage from "./features/post/pages/PostsPage";
import DashboardSkeleton from "./features/post/components/loading/DashboardSkeleton";
const App = () => {
  const { isInit } = useAuthInit();

  if (isInit) {
    return <DashboardSkeleton />;
  }
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashbord" element={<Dashbord />}>
        <Route path="posts/:type" element={<PostsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
