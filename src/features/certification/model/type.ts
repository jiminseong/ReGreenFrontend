export interface SubmitActivitiesItem {
  ecoVerificationId: string;
  title: string;
  iconS3ImageUrl: string;
  point: number;
  breakupAtPoint: number;
  memberEcoVerificationId: string;
  createdAt: string;
  s3ImageUrl: string;
  status: "SUBMIT" | "REVIEW" | "SUCCESS" | "REJECTED";
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
