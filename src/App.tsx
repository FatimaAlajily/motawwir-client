import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import Dashbord from "./pages/Dashbord";
import useAuthInit from "./features/auth/hooks/useAuthInit";
const App = () => {
  const { isInit } = useAuthInit();

  if (isInit) {
    return <div>جاري التحميل</div>;
  }
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashbord" element={<Dashbord />} />
    </Routes>
  );
};

export default App;
