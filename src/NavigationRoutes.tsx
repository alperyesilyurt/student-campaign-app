import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthOutlet from "./modules/Auth/AuthOutlet";
import ForgotPassword from "./modules/Auth/ForgotPassword";
import Login from "./modules/Auth/Login";
import Register from "./modules/Auth/Register";
import CampaignDetail from "./modules/CampaignDetail";
import Campaigns from "./modules/Campaigns";
import CompanyOutlet from "./modules/Companies";
import { CompanyLogin } from "./modules/Companies/CompanyLogin";
import { CompanyRegister } from "./modules/Companies/CompanyRegister";
import Contact from "./modules/Contacts";
import Home from "./modules/Home";
import {
  fetchUniversities,
  getCategoriesThunk,
  getCurrentUserThunk,
  setToken,
} from "./store/features";
import { useAppDispatch } from "./store/hooks";
import DashboardOutlet from "./modules/Dashboard/DashboardOutlet";
import DashboardHomeStudentView from "./modules/Dashboard/DashboardHomeStudentView";
import {
  getTokenFromStorage,
  removeTokenFromStorage,
} from "@/common/utils/storage";
import CompanyDashboardHome from "@/modules/Companies/Dashboard/CompanyDashboardHome";
import NotFoundPage from "@/components/404";

type Props = {};

export function NavigationRoutes({}: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUniversities());
    dispatch(getCategoriesThunk());
    const token = getTokenFromStorage();
    if (token && token.length > 11) {
      dispatch(setToken(token));
      dispatch(getCurrentUserThunk());
    } else {
      console.log("token yok");
      removeTokenFromStorage();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/auth" element={<AuthOutlet />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route path="/company" element={<CompanyOutlet />}>
        <Route path="login" element={<CompanyLogin />}></Route>
        <Route path="register" element={<CompanyRegister />}></Route>
      </Route>

      <Route path="/contact" element={<Contact />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/campaign/:id" element={<CampaignDetail />} />

      <Route path="/dashboard/company" element={<DashboardOutlet />}>
        <Route path="home" element={<CompanyDashboardHome />} />
      </Route>

      <Route path="/dashboard/student" element={<DashboardOutlet />}>
        <Route path="home" element={<DashboardHomeStudentView />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
