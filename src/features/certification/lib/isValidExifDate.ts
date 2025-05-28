/**
 * EXIF 날짜 문자열을 기준으로 유효 여부를 검사
 * @param exifDate "2024:05:28 13:15:02" 형식
 * @param maxAgeHours 허용 시간 (예: 24 → 24시간 이내만 허용)
 */
export const isValidExifDate = (exifDate: string | null, maxAgeHours = 24): boolean => {
  if (!exifDate) return true; // EXIF 없으면 통과

  const parts = exifDate.split(" ");
  if (parts.length !== 2) return true;

  const [datePart, timePart] = parts;
  const dateFormatted = datePart.replace(/:/g, "-");
  const isoString = `${dateFormatted}T${timePart}`;

  const takenTime = new Date(isoString).getTime();
  const now = Date.now();

  return now - takenTime <= maxAgeHours * 60 * 60 * 1000;
};
