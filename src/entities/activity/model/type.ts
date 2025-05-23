export interface ActivityItemResponse {
  code: number;
  message: string;
  data: ActivityItem[];
}
interface ActivityItem {
  ecoVerificationId: string;
  title: string;
  ecoLovePoint: number;
  breakupBufferPoint: number;
  iconImageUrl?: string;
}
