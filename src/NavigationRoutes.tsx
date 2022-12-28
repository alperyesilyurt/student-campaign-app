import React from "react";
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

type Props = {};

export function NavigationRoutes({}: Props) {
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
    </Routes>
  );
}
