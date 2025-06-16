export interface LoginResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ErrorWithResponse {
  res?: {
    code?: number;
    message?: string;
  };
}
