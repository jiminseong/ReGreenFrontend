"use client";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/shared/lib/http";
import { FurnitureItem } from "@/entities/room/model/type";

interface PlacedFurnitureInfo {
  code: string;
  message: string;
  data: FurnitureItem[];
}

export function useMyPlacedFurniture() {
  return useQuery<PlacedFurnitureInfo>({
    queryKey: ["couplePlacedFurniture"],

    queryFn: async () => {
      try {
        const res = await http
          .get("api/items")
          .json<{ code: string; message: string; data: FurnitureItem[] }>();
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
