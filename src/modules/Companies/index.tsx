import { CompanyAuthLayout } from "@/layouts/CompanyAuthLayout";
import { Outlet } from "react-router-dom";

export default function CompanyOutlet() {
  return (
    <CompanyAuthLayout>
      merhaba dunya
      <Outlet />
    </CompanyAuthLayout>
  );
}
