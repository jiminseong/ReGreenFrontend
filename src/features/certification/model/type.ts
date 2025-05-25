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
    ecoVerifications: SubmitActivitiesItem[];
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
}
