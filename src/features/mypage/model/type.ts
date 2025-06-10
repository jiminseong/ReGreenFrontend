export type CurrentActivityType = "REUSABLE_CUP" | "PLOGGING_PROOF" | string;

export interface SubmitCoupleActivitiesItem {
  date: "2025-06-01" | string;
  members: CoupleActivitiesResponseMember[];
}

export interface SubmitCoupleActivitiesResponse {
  code: 2000 | number;
  message: "OK" | string;
  data: {
    today: SubmitCoupleActivitiesItem;
    yesterday: SubmitCoupleActivitiesItem;
  };
}

export interface CoupleActivity {
  memberEcoVerificationId: "8c9449b5-2c0c-405d-be38-a2f7ec17caf1" | string;
  type: CurrentActivityType;
  ecoLovePoint: 50 | number;
  breakupBufferPoint: 2 | number;
  linkUrl: "https://balbal.com" | null | string;
  status: "APPROVED" | "REJECTED" | "GOING_OVER" | string; // 승인 상관없이 일단 다 보낼게
}

export interface CoupleActivitiesResponseMember {
  isMe: false | true;
  memberId: "5660f0dc-8853-4465-ac13-9c65f2202b67" | string;
  nickname: "홍길동" | string;
  memberEcoVerifications: CoupleActivity[];
}

export interface CoupleActivityResponse {
  code: 2000 | 42001 | 47001 | 47002;
  message: string;
  data: {
    ecoVerificationId: string;
    title: string;
    iconImageUrl: string;
    ecoLovePoint: number;
    breakupBufferPoint: number;
    memberEcoVerificationId: string;
    createdAt: string;
    imageUrl: string;
    status: string;
    location: string | null;
    geoLat: number | null;
    geoLng: number | null;
  };
}
