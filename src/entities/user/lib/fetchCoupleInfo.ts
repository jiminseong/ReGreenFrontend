import { http } from "@/shared/lib/http";
import { CoupleInfoResponse } from "../model/type";

export const fetchCoupleInfo = async () => {
  const response = await http.get("api/couples/my").json<CoupleInfoResponse>();
  return response;
};
