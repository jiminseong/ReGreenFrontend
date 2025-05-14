import { http } from "@/shared/lib/http";

export const buyFurniture = async (furnitureId: string) => {
  try {
    const response = await http.patch(`api/furniture/${furnitureId}`).json<{
      statusCode: string;
      message: string;
      data: {
        coupeFurnitureId: string;
      };
    }>();

    // 하트 부족 경우
    if (response.statusCode === "400" && response.message === "Not enough points") {
      return response.message;
    }

    //이미 구매한 경우
    if (response.statusCode === "409" && response.message === "Already owned") {
      return response.message;
    }

    // furnitureId가 없을 경우
    if (response.statusCode === "400" && response.message === "Invalid furniture id") {
      return response.message;
    }

    if (response.statusCode !== "2300") {
      throw new Error("Failed to patch room");
    }

    return response.data;
  } catch (error) {
    console.error("Error patching room:", error);
    throw error;
  }
};
