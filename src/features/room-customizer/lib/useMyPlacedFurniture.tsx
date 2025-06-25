"use client";
import { useQuery } from "@tanstack/react-query";
import { httpNoThrow } from "@/shared/lib/http";
import { FurnitureItem } from "@/entities/room/model/type";
import { useRouter } from "next/navigation";

interface PlacedFurnitureInfo {
  code: number;
  message: string;
  data: FurnitureItem[];
}

export function useMyPlacedFurniture() {
  const router = useRouter();
  return useQuery<PlacedFurnitureInfo>({
    queryKey: ["couplePlacedFurniture"],

    queryFn: async () => {
      try {
        const res = await httpNoThrow.get("api/items").json<PlacedFurnitureInfo>();

        if (res.code === 42001) {
          router.push("/couple");
          return {
            code: res.code,
            message: res.message || "redirect",
            data: [],
          };
        }
        return {
          code: res.code,
          message: res.message,
          data: res.data,
        };
      } catch (error) {
        console.error("가구 배치 데이터 불러오기 실패:", error);
        throw new Error("Failed to fetch furniture data");
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}
