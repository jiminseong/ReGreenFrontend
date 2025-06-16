export interface CoupleNickNameResponse {
  code: 2000 | number;
  message: "OK" | string;

  error: {
    code: 40000 | number;
    message: string;
    method: string;
    path: string;
    timestamp: string;
  };
}
