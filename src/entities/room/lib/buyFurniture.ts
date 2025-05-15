import { httpNoThrow } from "@/shared/lib/http";
import { HTTPError } from "ky";

interface BuyFurnitureResponse {
  statusCode: number;
  message: string;
  data?: {
    coupeFurnitureId: string;
  };
}

export const buyFurniture = async (furnitureId: string): Promise<BuyFurnitureResponse> => {
  try {
    const res = await httpNoThrow.post(`api/furniture/${furnitureId}`).json<BuyFurnitureResponse>();

    console.log("🔥 응답 데이터", res);

    return res;
  } catch (error) {
    console.error("❌ catch 진입!", error);

    if (error instanceof HTTPError) {
      try {
        const errJson: BuyFurnitureResponse = await error.response.json();
        console.log("❗에러 응답 내용:", errJson);
        return errJson;
      } catch {
        console.log("❗에러 응답 파싱 실패");
      }
    }

    return {
      statusCode: 500,
      message: "구매 실패: 예기치 못한 오류 발생",
    };
  }
};
