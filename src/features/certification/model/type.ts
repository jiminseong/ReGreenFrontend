export interface SubmitActivitiesItem {
  ecoVerificationId: string;
  title: string;
  iconImageUrl: string;
  ecoLovePoint: number;
  breakupBufferPoint: number;
  memberEcoVerificationId: string;
  createdAt: string;
  imageUrl: string;
  status: "submit" | "REJECTED" | "APPROVED";
  location: null;
  geoLat: null;
  geoLng: null;
}

export interface SubmitActivitiesResponse {
  code: number;
  message: string;
  data: {
    results: SubmitActivitiesItem[];
  };
}

export interface PostCertificationResponse {
  code: number;
  statusCode?: number;
  message: string;
  data: {
    memberEcoVerificationId: string;
    imageUrl: string;
    status: "REJECTED" | "APPROVED";
    aiReasonOfStatus: string;
  };
  //에러 일때 Response 타입
  error: {
    code: number;
    message: string;
    method: string;
    path: string;
    timestamp: string;
  };
}

export interface PostCertificationRetryResponse {
  code: 2000;
  message: "OK";
  error: {
    code: 47001 | 47002 | 47003;
    message:
      | "Member ecoVerification not found"
      | "Member and ecoVerification mismatch"
      | "Already approved ecoVerification type today";
    method: string;
    path: string;
    timestamp: string;
  };
}
