"use client";
import { useQuery } from "@tanstack/react-query";
import { httpNoThrow } from "@/shared/lib/http";
import { FurnitureItem } from "@/entities/room/model/type";
import { useRouter } from "next/navigation";

interface PlacedFurnitureInfo {
  code: string;
  message: string;
  data: FurnitureItem[];
  err: {
    code: number;
    message: string;
  };
}

export function useMyPlacedFurniture() {
  const router = useRouter();

  return useQuery({
    queryKey: ["couplePlacedFurniture"],

    queryFn: async () => {
      const res = await httpNoThrow.get("api/items").json<PlacedFurnitureInfo>();

      if (res.err.code === 42001) {
        router.push("/couple");
        return;
      }

      return {
        code: res.code,
        message: res.message,
        data: res.data,
      };
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}
