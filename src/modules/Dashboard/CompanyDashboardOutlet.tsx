import { DashboardLayout } from "@/layouts/DashboardLayout";
import { CompanyDashboardLayout } from "@/layouts/company/CompanyDashboardLayout";
import { Outlet } from "react-router-dom";

export default function CompanyDashboardOutlet() {
  return (
    <CompanyDashboardLayout>
      <Outlet />
    </CompanyDashboardLayout>
  );
}
