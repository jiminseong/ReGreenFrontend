"use client";
import { Suspense } from "react";
import LoginPage from "@/features/auth/ui/LoginPage";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <LoginPage />
    </Suspense>
  );
}
