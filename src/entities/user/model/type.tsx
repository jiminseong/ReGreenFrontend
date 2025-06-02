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
