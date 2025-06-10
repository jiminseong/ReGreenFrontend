import { httpNoThrow } from "@/shared/lib/http";
import { CoupleActivityResponse } from "../model/type";

export const getActivityInfo = async (memberEcoVerificationId: string) => {
  const res = await httpNoThrow
    .get(`api/eco-verifications/my/${memberEcoVerificationId}`)
    .json<CoupleActivityResponse>();
  return res;
};
