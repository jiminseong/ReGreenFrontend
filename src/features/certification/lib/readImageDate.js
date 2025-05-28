import * as EXIF from "exif-js";

/**
 * 이미지 파일의 EXIF 메타데이터에서 촬영 날짜(DateTimeOriginal)를 추출합니다.
 * @param file 이미지 파일 (File 객체)
 * @returns 촬영 날짜 문자열 (예: "2024:05:28 13:15:02") 또는 null
 */
export const readImageDate = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result !== "string") {
        resolve(null);
        return;
      }

      const img = new Image();
      img.onload = () => {
        try {
          EXIF.getData(img, function () {
            const dateTimeOriginal = EXIF.getTag(this, "DateTimeOriginal");
            resolve(dateTimeOriginal ?? null);
          });
        } catch (err) {
          console.error("EXIF 파싱 실패", err);
          resolve(null);
        }
      };

      img.onerror = () => {
        resolve(null);
      };

      img.src = result;
    };

    reader.onerror = () => {
      reject(new Error("파일 읽기 실패"));
    };

    reader.readAsDataURL(file);
  });
};
