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
