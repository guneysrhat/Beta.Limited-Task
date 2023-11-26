// Library
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "../pages/Login";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../pages/Dashboard";
import Firms from "../pages/Firms";


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="BetaLimited" element={<PrivateRouter />}>
          <Route path="" element={<Dashboard />}>
            <Route index element={<Firms />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
