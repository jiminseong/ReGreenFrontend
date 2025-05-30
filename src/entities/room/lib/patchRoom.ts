import { PatchRoomRequest, PatchRoomResponse } from "@/entities/room/model/type";
import { http } from "@/shared/lib/http";

export const patchRoom = async (data: PatchRoomRequest) => {
  try {
    const response = await http
      .patch("api/items/placements", {
        json: data,
      })
      .json<PatchRoomResponse>();

    if (response.code !== 2000) {
      throw new Error("Failed to patch room");
    }

    return response;
  } catch (error) {
    console.error("Error patching room:", error);
    throw error;
  }
};
