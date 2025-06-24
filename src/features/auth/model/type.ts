export interface LoginResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
  err: {
    code: number;
    message: string;
  };
}
