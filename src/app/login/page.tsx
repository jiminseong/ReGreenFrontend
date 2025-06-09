"use client";
import { Suspense } from "react";
import LoginPage from "@/features/auth/ui/LoginPage";
import LogoLoading from "@/widgets/LogoLoading";

export default function Page() {
  return (
    <Suspense fallback={<LogoLoading />}>
      <LoginPage />
    </Suspense>
  );
}
