// URL 인코딩 함수
export function encodeUrl(url: string) {
  return encodeURIComponent(url);
}

// URL 디코딩 함수
export function decodeUrl(encodedUrl: string) {
  return decodeURIComponent(encodedUrl);
}
