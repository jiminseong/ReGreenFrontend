import { httpNoThrow } from "@/shared/lib/http";
import { HTTPError } from "ky";

interface BuyFurnitureResponse {
  code: number;
  message: string;
  data?: {
    coupeFurnitureId: string;
  };
}

export const buyFurniture = async (furnitureId: string): Promise<BuyFurnitureResponse> => {
  try {
    const res = await httpNoThrow.post(`api/furniture/${furnitureId}`).json<BuyFurnitureResponse>();

    return res;
  } catch (error) {
    if (error instanceof HTTPError) {
      try {
        const errJson: BuyFurnitureResponse = await error.response.json();

        return errJson;
      } catch {}
    }

    return {
      code: 500,
      message: "구매 실패: 예기치 못한 오류 발생",
    };
  }
};
