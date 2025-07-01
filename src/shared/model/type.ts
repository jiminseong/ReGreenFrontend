export interface ErrorResponse {
  code: number;
  message: string;
  method?: string;
  path?: string;
  timestamp?: string;
}
