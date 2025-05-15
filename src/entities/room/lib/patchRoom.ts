import { PatchRoomRequest, PatchRoomResonse } from "@/entities/room/model/type";
import { http } from "@/shared/lib/http";

export const patchRoom = async (data: PatchRoomRequest) => {
  try {
    const response = await http
      .patch("api/furniture", {
        body: JSON.stringify(data),
      })
      .json<PatchRoomResonse>();

    if (response.statusCode !== 2300) {
      throw new Error("Failed to patch room");
    }

    return response;
  } catch (error) {
    console.error("Error patching room:", error);
    throw error;
  }
};
