import { AuthLayout } from "@/layouts/AuthLayout";
import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

export default function AuthOutlet({}: Props) {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
