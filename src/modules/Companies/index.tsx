import { CompanyAuthLayout } from "@/layouts/CompanyAuthLayout";
import CompanyAuthDefault from "@/layouts/company/CompanyAuthDefault";
import { Outlet } from "react-router-dom";

export default function CompanyOutlet() {
  return (
    <CompanyAuthDefault illustrationBackground="https://images.unsplash.com/photo-1678175718150-b56b0352264e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80">
      <Outlet />
    </CompanyAuthDefault>
  );
}
