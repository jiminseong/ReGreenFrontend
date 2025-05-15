export interface ActivityItemResponse {
  code: number;
  message: string;
  data: ActivityItem[];
}
interface ActivityItem {
  ecoVerificationId: string;
  title: string;
  imageUrl?: string;
  point: number;
  breakupAtPoint: number;
}
