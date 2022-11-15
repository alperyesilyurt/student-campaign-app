import { AuthLayout } from "@/layouts/AuthLayout";
import { Route, Routes } from "react-router-dom";

export default function CompanyOutlet() {
  return (
    <AuthLayout>
      enes ince
      <Routes>
        <Route path="/login"></Route>
        <Route path="/register"></Route>
      </Routes>
    </AuthLayout>
  );
}
