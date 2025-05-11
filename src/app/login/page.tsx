"use client";
import { Suspense } from "react";
import LoginPage from "@/features/auth/ui/LoginPage";
import Loading from "@/widgets/Loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginPage />
    </Suspense>
  );
}
