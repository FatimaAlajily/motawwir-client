import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import Dashbord from "./pages/Dashbord";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashbord" element={<Dashbord />} />
    </Routes>
  );
};

export default App;
