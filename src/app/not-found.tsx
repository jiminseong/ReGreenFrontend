"use client";
import Button from "@/shared/ui/Button";
import { useRouter } from "next/navigation";

// not-found.tsx
export default function NotFound() {
  const router = useRouter();
  function handleClick() {
    router.push("/");
  }
  return (
    <div className="px-5 py-10 relative flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-ppink font-extrabold text-5xl">404</h1>
        <p className="text-2xl font-bold">페이지를 찾을 수 없어요</p>
      </div>
      <Button className="absolute !w-[90%] bottom-5" onClick={handleClick}>
        홈으로 가기
      </Button>
    </div>
  );
}
