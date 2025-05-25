export interface SubmitActivitiesItem {
  ecoVerificationId: string;
  title: string;
  iconS3ImageUrl: string;
  point: number;
  breakupAtPoint: number;
  memberEcoVerificationId: string;
  createdAt: string;
  s3ImageUrl: string;
  status: "REJECTED" | "APPROVED";
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
