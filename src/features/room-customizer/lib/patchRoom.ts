import { FurnitureItem } from "@/entities/room/model/type";
import { http } from "@/shared/lib/http";

export const patchRoom = async (coupleId: string, furnitureId: string, isPlaced: boolean) => {
  try {
    const response = await http
      .patch("api/furniture", {
        json: {
          coupleId,
          replacedFurniture: {
            furnitureId,
            isPlaced,
          },
        },
      })
      .json<{
        code: string;
        message: string;
        data: FurnitureItem;
      }>();

    if (response.code !== "2300") {
      throw new Error("Failed to patch room");
    }

    return response.data;
  } catch (error) {
    console.error("Error patching room:", error);
    throw error;
  }
};
