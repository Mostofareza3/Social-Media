import { Route, Routes } from "react-router-dom";
import Activate from "./pages/home/activate";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Reset from "./pages/reset";
import LoggedinRoutes from "./routes/LoggedinRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<LoggedinRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/activate/:token" element={<Activate />} />
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
