import { ErrorResponse } from "@/shared/model/type";

export interface RankingsResponse {
  code: number;
  message: string;
  data: {
    results: RankingItem[];
  };

  error: ErrorResponse;
}

export interface RankingItem {
  coupleId: string;
  name: string;
  profileImageUrl: string;
  ecoScore: number;
  cumulativeEcoLovePoints: number;
  ecoVerificationCount: number;
  index?: number;
}
