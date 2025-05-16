export interface SubmitActivitiesItem {
  ecoVerificationId: "46340b9a-7e73-424c-8c35-eb4f83bed6fc";
  title: "중고 제품 나눔/구매 인증하기";
  iconS3ImageUrl: "https://regreen-bucket.s3.ap-northeast-2.amazonaws.com/images/constant/eco/reuse.png";
  point: 100;
  breakupAtPoint: 10;
  memberEcoVerificationId: "16349d56-a181-45c7-808a-6660a7cd169f";
  createdAt: "2025-05-15T11:18:53.820Z";
  s3ImageUrl: "https://regreen-bucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-05-15%2001.58.43-1747340332562.png";
  status: "submit" | "review" | "success";
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
