export interface CoupleType {
  memberId: string;
  nickname: string;
  profileImageUrl: string;
}

export interface InviteCodeResponse {
  code: number;
  message: string;
  method: string;
  path: string;
  timestamp: string;
}

export interface MemberInfo {
  email: string;
  memberId: string;
  nickname: string;
  profileImageUrl: string;
  coupleId: string | null;
}

export interface CoupleInfo {
  coupleId: string;
  ecoLovePoint: number;
  breakupBufferPoint: number | null;
  profileImageUrl: string | null;
  cumulativeEcoLovePoints: number | null;
  ecoScore: number | null;
  name: string | null;
  rank: number | null;
  members: [
    {
      memberId: string;
      nickname: string;
      profileImageUrl: string;
    },
    {
      memberId: string;
      nickname: string;
      profileImageUrl: string;
    }
  ];
}

export interface CoupleInfoResponse {
  code: string;
  message: string;
  data: CoupleInfo;
}
