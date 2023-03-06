import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Outlet } from "react-router-dom";

export default function DashboardOutlet() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
